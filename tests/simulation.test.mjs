import assert from 'node:assert/strict';
import test from 'node:test';
import plugin from '../plugins/simulation.mjs';

function render(name, arg, options = {}) {
  return plugin.directives.find(item => item.name === name).run({ arg, options })[0];
}

test('providers emit working URL shapes and static screenshot fallbacks', () => {
  const cases = [
    ['openlyceum', 'SpecialRelativity', 'https://openlyceum.github.io/SpecialRelativity/', 'https://raw.githubusercontent.com/OpenLyceum/Baton/main/screenshots/SpecialRelativity.png'],
    ['phet', 'blackbody-spectrum', 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_en.html', 'https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum-600.png'],
    ['phet-legacy', 'nuclear-physics/alpha-decay', 'https://phet.colorado.edu/sims/cheerpj/nuclear-physics/latest/nuclear-physics.html?simulation=alpha-decay', 'https://phet.colorado.edu/sims/nuclear-physics/alpha-decay-600.png'],
  ];
  for (const [provider, id, url, screenshot] of cases) {
    const { children } = render(provider, id);
    assert.equal(children[0].src, url);
    assert.equal(children[1].url, screenshot);
    assert.ok(children[0].title);
    assert.ok(children[1].alt);
    assert.equal(children[2].children[0].children[1].url, url);
    assert.deepEqual(render('simulation', `${provider}:${id}`), render(provider, id));
  }
});

test('parameters, accessible names, and explicit fallback options survive', () => {
  const { children } = render('openlyceum', 'SpecialRelativity', {
    screens: '1,2', screen: '2', locale: 'fr', params: '?foo=bar',
    'sim-name': 'Moving clocks', title: 'Explore moving clocks',
    placeholder: '/images/clocks.png', alt: 'Two clocks on a train',
  });
  const url = new URL(children[0].src);
  assert.equal(url.searchParams.get('screens'), '1,2');
  assert.equal(url.searchParams.get('initialScreen'), '2');
  assert.equal(url.searchParams.get('locale'), 'fr');
  assert.equal(url.searchParams.get('foo'), 'bar');
  assert.equal(children[0].title, 'Explore moving clocks');
  assert.equal(children[1].alt, 'Two clocks on a train');
  assert.equal(children[1].url, '/images/clocks.png');
  assert.equal(children[2].children[0].children[1].children[0].value, 'Moving clocks');
  assert.match(render('phet', 'blackbody-spectrum', { locale: 'fr' }).children[0].src, /_fr.html$/);
});

test('generic simulations have a local fallback and invalid providers report errors', () => {
  assert.equal(render('simulation', 'https://example.test/sim').children[1].url, '/images/simulation-placeholder.png');
  assert.match(JSON.stringify(render('simulation', 'unknown:sim')), /unknown simulation provider/);
  assert.equal(render('simulation', 'https://example.test/sim', { 'no-placeholder': true, 'no-link': true }).children.length, 1);
});
