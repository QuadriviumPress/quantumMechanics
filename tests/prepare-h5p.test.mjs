import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { strToU8, zipSync } from 'fflate';

import { buildH5p } from '../scripts/prepare-h5p.mjs';

function writeJson( file, value ) {
  fs.mkdirSync( path.dirname( file ), { recursive: true } );
  fs.writeFileSync( file, `${JSON.stringify( value )}\n` );
}

function dependency( machineName, majorVersion = 1, minorVersion = 0 ) {
  return { machineName, majorVersion, minorVersion };
}

function library( source, name, dependencies = [] ) {
  const root = path.join( source, 'libraries', `${name}-1.0` );
  writeJson( path.join( root, 'library.json' ), {
    machineName: name, majorVersion: 1, minorVersion: 0,
    preloadedDependencies: dependencies
  } );
  fs.writeFileSync( path.join( root, 'runtime.js' ), `${name} runtime` );
  fs.mkdirSync( path.join( root, 'Documentation' ), { recursive: true } );
  fs.writeFileSync( path.join( root, 'Documentation', 'large.png' ), 'not deployed' );
  fs.writeFileSync( path.join( root, 'package-lock.json' ), '{}' );
  return root;
}

function sourceTree( root ) {
  const source = path.join( root, 'h5p' );
  fs.mkdirSync( path.join( source, 'player' ), { recursive: true } );
  fs.writeFileSync( path.join( source, 'embed.html' ), '<!doctype html>' );
  fs.writeFileSync( path.join( source, 'overrides.css' ), '' );
  fs.writeFileSync( path.join( source, 'player', 'main.bundle.js' ), 'player' );
  fs.writeFileSync( path.join( source, 'player', 'h5p.d.ts' ), 'not deployed' );
  return source;
}

test( 'buildH5p selects recursive dependencies and omits development files', () => {
  const root = fs.mkdtempSync( path.join( os.tmpdir(), 'prepare-h5p-' ) );
  try {
    const source = sourceTree( root );
    const output = path.join( root, '.generated', 'h5p' );
    library( source, 'H5P.Required', [ dependency( 'H5P.Transitive' ) ] );
    library( source, 'H5P.Transitive' );
    library( source, 'H5P.Unused' );
    writeJson( path.join( source, 'content', 'direct', 'h5p.json' ), {
      preloadedDependencies: [ dependency( 'H5P.Required' ) ]
    } );
    writeJson( path.join( source, 'content', 'direct', 'content', 'content.json' ), { question: 'Direct' } );

    const result = buildH5p( { source, output, logger: { log() {} } } );

    assert.deepEqual( result.activities, [ 'direct' ] );
    assert.deepEqual( result.libraries, [ 'H5P.Required-1.0', 'H5P.Transitive-1.0' ] );
    assert.ok( fs.existsSync( path.join( output, 'libraries', 'H5P.Required-1.0', 'runtime.js' ) ) );
    assert.ok( !fs.existsSync( path.join( output, 'libraries', 'H5P.Required-1.0', 'Documentation' ) ) );
    assert.ok( !fs.existsSync( path.join( output, 'libraries', 'H5P.Required-1.0', 'package-lock.json' ) ) );
    assert.ok( !fs.existsSync( path.join( output, 'libraries', 'H5P.Unused-1.0' ) ) );
    assert.ok( !fs.existsSync( path.join( output, 'player', 'h5p.d.ts' ) ) );
  }
  finally {
    fs.rmSync( root, { recursive: true, force: true } );
  }
} );

test( 'buildH5p imports standard packages and their bundled libraries', () => {
  const root = fs.mkdtempSync( path.join( os.tmpdir(), 'prepare-h5p-package-' ) );
  try {
    const source = sourceTree( root );
    const output = path.join( root, '.generated', 'h5p' );
    fs.mkdirSync( path.join( source, 'packages' ), { recursive: true } );
    const archive = zipSync( {
      'h5p.json': strToU8( JSON.stringify( {
        mainLibrary: 'H5P.PackageType',
        preloadedDependencies: [ dependency( 'H5P.PackageType' ) ]
      } ) ),
      'content/content.json': strToU8( JSON.stringify( { question: 'Packaged' } ) ),
      'H5P.PackageType-1.0/library.json': strToU8( JSON.stringify( {
        machineName: 'H5P.PackageType', majorVersion: 1, minorVersion: 0
      } ) ),
      'H5P.PackageType-1.0/runtime.js': strToU8( 'package runtime' ),
      'H5P.PackageType-1.0/docs/readme.md': strToU8( 'not deployed' )
    } );
    fs.writeFileSync( path.join( source, 'packages', 'new-activity.h5p' ), archive );

    const result = buildH5p( { source, output, logger: { log() {} } } );

    assert.deepEqual( result.activities, [ 'new-activity' ] );
    assert.deepEqual( result.libraries, [ 'H5P.PackageType-1.0' ] );
    assert.deepEqual(
      JSON.parse( fs.readFileSync( path.join( output, 'content', 'new-activity', 'content', 'content.json' ) ) ),
      { question: 'Packaged' }
    );
    assert.ok( fs.existsSync( path.join( output, 'libraries', 'H5P.PackageType-1.0', 'runtime.js' ) ) );
    assert.ok( !fs.existsSync( path.join( output, 'libraries', 'H5P.PackageType-1.0', 'docs' ) ) );
  }
  finally {
    fs.rmSync( root, { recursive: true, force: true } );
  }
} );

test( 'buildH5p fails when an activity dependency is unavailable', () => {
  const root = fs.mkdtempSync( path.join( os.tmpdir(), 'prepare-h5p-missing-' ) );
  try {
    const source = sourceTree( root );
    writeJson( path.join( source, 'content', 'broken', 'h5p.json' ), {
      preloadedDependencies: [ dependency( 'H5P.Missing' ) ]
    } );
    writeJson( path.join( source, 'content', 'broken', 'content', 'content.json' ), {} );
    assert.throws(
      () => buildH5p( { source, output: path.join( root, 'output' ), logger: { log() {} } } ),
      /H5P dependency H5P\.Missing-1\.0 is required/
    );
  }
  finally {
    fs.rmSync( root, { recursive: true, force: true } );
  }
} );
