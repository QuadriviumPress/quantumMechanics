#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { strFromU8, unzipSync } from 'fflate';

const MAX_ARCHIVE_FILES = 50_000;
const MAX_ARCHIVE_SIZE = 512 * 1024 * 1024;
const DEPENDENCY_FIELDS = [ 'preloadedDependencies', 'dynamicDependencies' ];
const OMIT_DIRECTORIES = new Set( [
  '.git', '.github', 'documentation', 'docs', 'node_modules', 'test', 'tests'
] );
const OMIT_FILES = new Set( [
  '.eslintignore', '.eslintrc', '.eslintrc.js', '.eslintrc.json',
  '.prettierignore', '.prettierrc', '.prettierrc.json',
  'package-lock.json', 'package.json', 'pnpm-lock.yaml', 'yarn.lock'
] );

function readJsonFile( file ) {
  try {
    return JSON.parse( fs.readFileSync( file, 'utf8' ) );
  }
  catch ( error ) {
    throw new Error( `${file}: invalid JSON (${error.message})` );
  }
}

function readJsonBytes( bytes, label ) {
  try {
    return JSON.parse( strFromU8( bytes ) );
  }
  catch ( error ) {
    throw new Error( `${label}: invalid JSON (${error.message})` );
  }
}

function dependencyKey( dependency, label ) {
  const machineName = dependency?.machineName;
  const majorVersion = Number( dependency?.majorVersion );
  const minorVersion = Number( dependency?.minorVersion );
  if ( !machineName || !Number.isInteger( majorVersion ) || !Number.isInteger( minorVersion ) ) {
    throw new Error( `${label}: malformed H5P dependency ${JSON.stringify( dependency )}` );
  }
  return `${machineName}-${majorVersion}.${minorVersion}`;
}

function dependenciesOf( metadata, label ) {
  return DEPENDENCY_FIELDS.flatMap( field => {
    const dependencies = metadata?.[ field ] ?? [];
    if ( !Array.isArray( dependencies ) ) {
      throw new Error( `${label}: ${field} must be an array` );
    }
    return dependencies.map( dependency => dependencyKey( dependency, `${label}:${field}` ) );
  } );
}

function validateArchivePath( name, archive ) {
  const normalized = name.replaceAll( '\\', '/' );
  const parts = normalized.split( '/' );
  if ( !normalized || normalized.startsWith( '/' ) || /^[A-Za-z]:/.test( normalized ) ||
       parts.some( part => part === '..' || part.includes( '\0' ) ) ) {
    throw new Error( `${archive}: unsafe archive path ${JSON.stringify( name )}` );
  }
  return normalized.replace( /^\.\//, '' );
}

function readPackage( file ) {
  let count = 0;
  let expandedSize = 0;
  const raw = unzipSync( fs.readFileSync( file ), {
    filter( entry ) {
      const normalized = validateArchivePath( entry.name, file );
      count += 1;
      expandedSize += entry.originalSize;
      if ( count > MAX_ARCHIVE_FILES || expandedSize > MAX_ARCHIVE_SIZE ) {
        throw new Error( `${file}: archive exceeds the H5P extraction limit` );
      }
      return !normalized.endsWith( '/' );
    }
  } );
  const files = new Map();
  for ( const [ name, bytes ] of Object.entries( raw ) ) {
    const normalized = validateArchivePath( name, file );
    if ( files.has( normalized ) ) throw new Error( `${file}: duplicate archive path ${normalized}` );
    files.set( normalized, bytes );
  }
  if ( !files.has( 'h5p.json' ) || ![ ...files.keys() ].some( name => name.startsWith( 'content/' ) ) ) {
    throw new Error( `${file}: an .h5p package must contain h5p.json and content/` );
  }
  return { file, files, metadata: readJsonBytes( files.get( 'h5p.json' ), `${file}:h5p.json` ) };
}

function shouldDeployLibraryFile( relative ) {
  const parts = relative.split( path.sep );
  if ( parts.some( part => OMIT_DIRECTORIES.has( part.toLowerCase() ) ) ) return false;
  const basename = parts.at( -1 );
  if ( OMIT_FILES.has( basename.toLowerCase() ) ) return false;
  if ( /^(?:webpack|rollup|vite|babel|eslint|prettier)\.config\./i.test( basename ) ) return false;
  if ( /\.map$/i.test( basename ) ) return false;
  if ( /\.(?:md|markdown)$/i.test( basename ) && !/^licen[cs]e/i.test( basename ) ) return false;
  return true;
}

function validateManifestAssets( output, selected ) {
  for ( const key of selected ) {
    const root = path.join( output, 'libraries', key );
    const manifest = path.join( root, 'library.json' );
    const metadata = readJsonFile( manifest );
    for ( const field of [ 'preloadedJs', 'preloadedCss' ] ) {
      const assets = metadata[ field ] ?? [];
      if ( !Array.isArray( assets ) ) throw new Error( `${manifest}: ${field} must be an array` );
      for ( const asset of assets ) {
        const relative = asset?.path;
        if ( typeof relative !== 'string' || !relative || path.isAbsolute( relative ) ||
             relative.split( /[\\/]/ ).some( part => part === '..' || part.includes( '\0' ) ) ) {
          throw new Error( `${manifest}: unsafe ${field} path ${JSON.stringify( relative )}` );
        }
        if ( !fs.existsSync( path.join( root, ...relative.split( /[\\/]/ ) ) ) ) {
          throw new Error( `${manifest}: ${field} asset ${relative} was not packaged` );
        }
      }
    }
  }
}

function copyDirectory( source, destination, filter = () => true, relative = '' ) {
  fs.mkdirSync( destination, { recursive: true } );
  for ( const entry of fs.readdirSync( source, { withFileTypes: true } ) ) {
    const sourceFile = path.join( source, entry.name );
    const destinationFile = path.join( destination, entry.name );
    const entryRelative = path.join( relative, entry.name );
    if ( entry.isSymbolicLink() ) throw new Error( `${sourceFile}: symlinks are not allowed in H5P assets` );
    if ( entry.isDirectory() ) {
      if ( filter( entryRelative, true ) ) copyDirectory( sourceFile, destinationFile, filter, entryRelative );
    }
    else if ( entry.isFile() && filter( entryRelative, false ) ) {
      fs.mkdirSync( path.dirname( destinationFile ), { recursive: true } );
      fs.copyFileSync( sourceFile, destinationFile );
    }
  }
}

function writeArchiveFiles( files, destination, prefix, filter = () => true ) {
  for ( const [ name, bytes ] of files ) {
    if ( !name.startsWith( prefix ) ) continue;
    const relative = name.slice( prefix.length );
    if ( !relative || !filter( relative, false ) ) continue;
    const target = path.join( destination, ...relative.split( '/' ) );
    fs.mkdirSync( path.dirname( target ), { recursive: true } );
    fs.writeFileSync( target, bytes );
  }
}

function addLibrary( catalog, key, library ) {
  if ( !catalog.has( key ) ) catalog.set( key, library );
}

function sourceLibraries( source, catalog ) {
  const libraries = path.join( source, 'libraries' );
  if ( !fs.existsSync( libraries ) ) return;
  for ( const entry of fs.readdirSync( libraries, { withFileTypes: true } ) ) {
    if ( !entry.isDirectory() ) continue;
    const root = path.join( libraries, entry.name );
    const manifest = path.join( root, 'library.json' );
    if ( !fs.existsSync( manifest ) ) continue;
    const metadata = readJsonFile( manifest );
    const key = dependencyKey( metadata, manifest );
    addLibrary( catalog, key, { kind: 'directory', root, metadata, label: manifest } );
  }
}

function packageLibraries( packages, catalog ) {
  for ( const item of packages ) {
    for ( const [ name, bytes ] of item.files ) {
      const parts = name.split( '/' );
      if ( parts.length !== 2 || parts[ 1 ] !== 'library.json' ) continue;
      const metadata = readJsonBytes( bytes, `${item.file}:${name}` );
      const key = dependencyKey( metadata, `${item.file}:${name}` );
      addLibrary( catalog, key, {
        kind: 'archive', files: item.files, prefix: `${parts[ 0 ]}/`, metadata,
        label: `${item.file}:${name}`
      } );
    }
  }
}

function directContent( source ) {
  const contentRoot = path.join( source, 'content' );
  if ( !fs.existsSync( contentRoot ) ) return [];
  return fs.readdirSync( contentRoot, { withFileTypes: true } )
    .filter( entry => entry.isDirectory() )
    .map( entry => {
      const root = path.join( contentRoot, entry.name );
      const manifest = path.join( root, 'h5p.json' );
      if ( !fs.existsSync( manifest ) ) throw new Error( `${root}: missing h5p.json` );
      if ( !fs.existsSync( path.join( root, 'content', 'content.json' ) ) ) {
        throw new Error( `${root}: missing content/content.json` );
      }
      return { id: entry.name, kind: 'directory', root, metadata: readJsonFile( manifest ), label: manifest };
    } );
}

function packageContent( packages ) {
  return packages.map( item => {
    const id = path.basename( item.file, path.extname( item.file ) );
    if ( !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test( id ) ) {
      throw new Error( `${item.file}: package filename must be a safe H5P content id` );
    }
    return { id, kind: 'archive', package: item, metadata: item.metadata, label: `${item.file}:h5p.json` };
  } );
}

function resolveLibraries( content, catalog ) {
  const selected = new Set();
  const pending = content.flatMap( item => dependenciesOf( item.metadata, item.label ) );
  while ( pending.length ) {
    const key = pending.pop();
    if ( selected.has( key ) ) continue;
    const library = catalog.get( key );
    if ( !library ) throw new Error( `H5P dependency ${key} is required but is not available in h5p/libraries or an .h5p package` );
    selected.add( key );
    pending.push( ...dependenciesOf( library.metadata, library.label ) );
  }
  return [ ...selected ].sort();
}

function directorySize( root ) {
  let bytes = 0;
  for ( const entry of fs.readdirSync( root, { withFileTypes: true } ) ) {
    const target = path.join( root, entry.name );
    bytes += entry.isDirectory() ? directorySize( target ) : fs.statSync( target ).size;
  }
  return bytes;
}

/**
 * Build the minimal deployable H5P tree from unpacked activities and optional
 * standard .h5p packages. Libraries are selected from dependency metadata,
 * while documentation and development-only files stay in the authoring tree.
 */
export function buildH5p( { source, output, logger = console } ) {
  for ( const required of [ 'embed.html', 'overrides.css', 'player' ] ) {
    if ( !fs.existsSync( path.join( source, required ) ) ) throw new Error( `${source}: missing ${required}` );
  }

  const packagesRoot = path.join( source, 'packages' );
  const packageFiles = fs.existsSync( packagesRoot )
    ? fs.readdirSync( packagesRoot ).filter( name => name.toLowerCase().endsWith( '.h5p' ) ).sort()
      .map( name => path.join( packagesRoot, name ) )
    : [];
  const packages = packageFiles.map( readPackage );
  const catalog = new Map();
  sourceLibraries( source, catalog );
  packageLibraries( packages, catalog );

  const content = [ ...directContent( source ), ...packageContent( packages ) ];
  const ids = new Set();
  for ( const item of content ) {
    if ( ids.has( item.id ) ) throw new Error( `duplicate H5P content id ${item.id}` );
    ids.add( item.id );
  }
  const selected = resolveLibraries( content, catalog );

  const parent = path.dirname( output );
  const stage = path.join( parent, `.h5p-stage-${process.pid}-${Date.now()}` );
  fs.mkdirSync( parent, { recursive: true } );
  fs.rmSync( stage, { recursive: true, force: true } );
  try {
    fs.mkdirSync( stage, { recursive: true } );
    for ( const name of [ 'embed.html', 'overrides.css' ] ) {
      fs.copyFileSync( path.join( source, name ), path.join( stage, name ) );
    }
    copyDirectory( path.join( source, 'player' ), path.join( stage, 'player' ), relative => !relative.endsWith( '.d.ts' ) );

    for ( const item of content ) {
      const destination = path.join( stage, 'content', item.id );
      if ( item.kind === 'directory' ) copyDirectory( item.root, destination );
      else {
        fs.mkdirSync( destination, { recursive: true } );
        fs.writeFileSync( path.join( destination, 'h5p.json' ), item.package.files.get( 'h5p.json' ) );
        writeArchiveFiles( item.package.files, path.join( destination, 'content' ), 'content/' );
      }
    }

    for ( const key of selected ) {
      const library = catalog.get( key );
      const destination = path.join( stage, 'libraries', key );
      if ( library.kind === 'directory' ) {
        copyDirectory( library.root, destination, shouldDeployLibraryFile );
      }
      else {
        writeArchiveFiles( library.files, destination, library.prefix, shouldDeployLibraryFile );
      }
    }

    validateManifestAssets( stage, selected );

    fs.rmSync( output, { recursive: true, force: true } );
    fs.renameSync( stage, output );
  }
  catch ( error ) {
    fs.rmSync( stage, { recursive: true, force: true } );
    throw error;
  }

  const bytes = directorySize( output );
  logger.log( `Prepared H5P: ${content.length} activities, ${selected.length} libraries, ${( bytes / 1048576 ).toFixed( 1 )} MiB.` );
  return { activities: content.map( item => item.id ).sort(), libraries: selected, bytes };
}

function main() {
  const root = path.resolve( import.meta.dirname, '..' );
  buildH5p( {
    source: path.join( root, 'h5p' ),
    output: path.join( root, '.generated', 'h5p' )
  } );
}

if ( process.argv[ 1 ] && import.meta.url === pathToFileURL( path.resolve( process.argv[ 1 ] ) ).href ) main();
