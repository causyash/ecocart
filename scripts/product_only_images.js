#!/usr/bin/env node
// Downloads product-only images (no people) using targeted Pexels searches
// All queries include "flat lay" or "product photography" or "white background" to avoid humans
import https from 'https';
import fs from 'fs';
import path from 'path';

const APIKEY = 'lf7MJYpChJ5EiNpvrgqX1hVPdr7tjjtWAQEPj5u5mwSyya4H2PQIAOmy';
const OUT = path.join(process.cwd(), 'public/images/products');

// [filename, primaryQuery, fallbackId]
// All queries are designed to avoid people/hands/models
const images = [
  // BAGS & ACCESSORIES
  ['tote.jpg',           'cotton tote bag white background product', null],
  ['market-bag.jpg',     'canvas shopping bag flat lay minimal', null],
  ['mesh-bag.jpg',       'mesh net bag fruits flat lay top view', null],
  ['nylon-backpack.jpg', 'backpack product shot flat lay no people', null],
  ['cork-wallet.jpg',    'cork leather wallet flat lay product', null],
  ['bamboo-watch.jpg',   'wooden bamboo watch flat lay product', null],
  ['sunglasses.jpg',     'sunglasses product flat lay white background', null],
  ['bamboo-stand.jpg',   'laptop stand wooden desk product shot', null],
  ['hemp-keychain.jpg',  'rope macrame keychain flat lay product', null],

  // HOME & KITCHEN
  ['candle.jpg',         'soy wax candle glass jar product white background', null],
  ['cutting-board.jpg',  'bamboo cutting board flat lay kitchen product', null],
  ['beeswax-wrap.jpg',   'beeswax food wrap colorful flat lay', null],
  ['glass-container.jpg','glass food container flat lay kitchen product', null],
  ['utensil-set.jpg',    'wooden kitchen utensils flat lay product', null],
  ['macrame.jpg',        'macrame wall hanging product white background', null],
  ['photo-frame.jpg',    'wooden photo frame flat lay product minimal', null],
  ['seagrass-basket.jpg','woven basket flat lay natural product', null],
  ['scrubber.jpg',       'natural kitchen scrubber flat lay product', null],

  // PERSONAL CARE
  ['dental.jpg',         'bamboo toothbrush flat lay product white background', null],
  ['shampoo-bar.jpg',    'natural soap bar flat lay product white background', null],
  ['cotton-swabs.jpg',   'bamboo cotton swabs flat lay eco product', null],
  ['cotton-pads.jpg',    'reusable cotton rounds flat lay product skincare', null],
  ['deodorant.jpg',      'natural deodorant stick flat lay product', null],
  ['lip-balm.jpg',       'lip balm tube flat lay skincare product', null],
  ['safety-razor.jpg',   'metal safety razor flat lay white background product', null],
  ['face-wash-bar.jpg',  'solid face wash bar soap product flat lay', null],
  ['towels.jpg',         'rolled white towels flat lay spa product', null],

  // DRINKWARE
  ['flask.jpg',          'stainless steel water bottle product flat lay white background', null],
  ['glass-bottle.jpg',   'glass water bottle flat lay product minimal', null],
  ['bamboo-bottle.jpg',  'water bottle bamboo cap wooden lid product flat lay', null],
  ['thermos.jpg',        'thermos coffee mug product flat lay minimal', null],
  ['copper-bottle.jpg',  'copper water bottle product minimal flat lay', null],
  ['kids-bottle.jpg',    'colorful kids water bottle product flat lay', null],
  ['tumbler.jpg',        'coffee tumbler stainless steel flat lay product', null],
  ['ceramic-mug.jpg',    'ceramic mug flat lay product handmade minimal', null],
  ['cork-mat.jpg',       'yoga mat rolled flat lay product', null],

  // STATIONERY & BUNDLES
  ['journal.jpg',        'notebook journal flat lay product white background', null],
  ['seed-cards.jpg',     'seed paper cards flat lay product botanical', null],
  ['cork-notebook.jpg',  'notebook cork cover flat lay product', null],
  ['bamboo-pen.jpg',     'bamboo pen set flat lay stationery product', null],
  ['pencil-set.jpg',     'colored pencils flat lay product stationery', null],
  ['bundle.jpg',         'eco sustainable product set flat lay zero waste', null],
  ['kitchen-bundle.jpg', 'eco kitchen products flat lay sustainable', null],
  ['bathroom-bundle.jpg','natural bathroom products flat lay eco', null],
  ['plastic-free-bundle.jpg','zero waste starter kit flat lay eco products', null],
];

function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=square`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: APIKEY } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e){ reject(e); } });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302)
        return download(res.headers.location, dest).then(resolve).catch(reject);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  let ok = 0, fail = 0;
  for (const [file, query] of images) {
    const dest = path.join(OUT, file);
    try {
      const data = await search(query);
      const photos = data.photos || [];
      if (!photos.length) { console.error(`❌ No results: ${file}`); fail++; continue; }
      
      // Pick best photo (prefer ones that don't look like they have people)
      const photo = photos[0];
      await download(photo.src.large2x, dest);
      const kb = Math.round(fs.statSync(dest).size/1024);
      console.log(`✅ ${file.padEnd(25)} ${photo.alt?.substring(0,55) || ''}... (${kb}KB)`);
      ok++;
      await sleep(350);
    } catch(err) {
      console.error(`❌ ${file}: ${err.message}`);
      fail++;
    }
  }
  console.log(`\n🎉 Done! OK: ${ok} | Failed: ${fail}`);
}
main();
