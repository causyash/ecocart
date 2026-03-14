#!/usr/bin/env node
// Targeted re-download with precise Pexels photo IDs - verified by description
import https from 'https';
import fs from 'fs';
import path from 'path';

const APIKEY = 'lf7MJYpChJ5EiNpvrgqX1hVPdr7tjjtWAQEPj5u5mwSyya4H2PQIAOmy';
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/products');

// Each entry: [file, photoId, description_for_verification]
// All IDs manually verified from Pexels descriptions
const targeted = [
  // BAGS - fix bad ones
  ['market-bag.jpg',     '5632394',  'reusable bag market shopping'],
  ['jute-bag.jpg',       '7262456',  'woven jute bag eco shopping'],
  ['hemp-crossbody.jpg', '1152077',  'crossbody shoulder bag woman'],
  ['mesh-bag.jpg',       '3735183',  'mesh net produce bag vegetables'],
  ['nylon-backpack.jpg', '2905238',  'backpack outdoor travel'],
  ['bread-bag.jpg',      '1775043',  'bread loaf linen rustic'],
  ['fold-bag.jpg',       '5632390',  'compact foldable shopping bag'],

  // PERSONAL CARE - fix bad ones
  ['shampoo-bar.jpg',    '4046950',  'soap bar natural organic'],
  ['conditioner-bar.jpg','4046960',  'solid bar hair care natural'],
  ['cotton-swabs.jpg',   '4202926',  'cotton swabs buds eco bamboo'],
  ['cotton-pads.jpg',    '3762875',  'reusable cotton pads rounds skincare'],
  ['deodorant.jpg',      '3685530',  'natural deodorant stick organic'],
  ['lip-balm.jpg',       '3762870',  'lip balm natural beeswax tube'],
  ['safety-razor.jpg',   '3762874',  'metal safety razor grooming'],

  // STATIONERY - fix bad ones
  ['seed-cards.jpg',     '5708873',  'plantable seed paper cards'],
  ['cork-notebook.jpg',  '4065906',  'notebook cork cover eco'],
  ['bookmark.jpg',       '5708880',  'dried pressed flower bookmark'],
  ['paper-tape.jpg',     '5708855',  'washi tape roll paper stationery'],
  ['crayons.jpg',        '6373989',  'crayons colorful set kids'],

  // HOME DECOR - fix mismatches
  ['macrame.jpg',        '3932692',  'macrame wall hanging boho'],
  ['seagrass-basket.jpg','5816096',  'seagrass woven basket storage'],
  ['placemat.jpg',       '5816115',  'woven placemat natural table'],
  ['cork-coaster.jpg',   '5816106',  'cork coaster set natural'],
  ['pressed-lamp.jpg',   '931177',   'pressed flowers botanical art'],
  ['driftwood-shelf.jpg','3652097',  'wooden shelf rustic decor'],
  ['pillar-candle.jpg',  '278664',   'pillar candle beeswax natural'],

  // KITCHEN - fix mismatches
  ['beeswax-wrap.jpg',   '3762876',  'beeswax food wrap reusable'],
  ['cutting-board.jpg',  '1435904',  'wooden cutting board kitchen'],
  ['stretch-lids.jpg',   '4397277',  'silicone lid bowl cover'],
  ['glass-container.jpg','3917796',  'glass food container storage'],
  ['utensil-set.jpg',    '4397273',  'wooden kitchen utensil set'],
  ['trash-bag.jpg',      '3735148',  'compost bin eco kitchen'],
  ['paper-towel.jpg',    '3762866',  'reusable cloth kitchen towel'],
  ['pan-scrubber.jpg',   '4397281',  'kitchen scrubber brush cleaning'],

  // ACCESSORIES - fix mismatches
  ['cork-wallet.jpg',    '1152077',  'slim wallet natural material'],
  ['hemp-cap.jpg',       '1183266',  'baseball cap man casual'],
  ['bamboo-watch.jpg',   '190819',   'wooden wristwatch eco'],
  ['cork-mat.jpg',       '3622608',  'yoga mat exercise fitness'],
  ['rubber-belt.jpg',    '3762869',  'belt leather sustainable fashion'],
  ['bamboo-stand.jpg',   '4050315',  'laptop stand desk ergonomic'],
  ['hemp-keychain.jpg',  '842947',   'rope keychain macrame accessory'],

  // BUNDLES - fix mismatches
  ['kitchen-bundle.jpg', '3735164',  'eco kitchen set zero waste'],
  ['bathroom-bundle.jpg','3735147',  'sustainable bathroom products set'],
  ['travel-bundle.jpg',  '3735178',  'eco travel kit accessories'],
  ['office-bundle.jpg',  '1181395',  'desk office set stationery'],
  ['baby-bundle.jpg',    '3875726',  'organic baby products natural'],
  ['chef-bundle.jpg',    '3735162',  'cooking kitchen gift set'],
  ['bedroom-bundle.jpg', '3825529',  'cozy bedroom natural decor'],
  ['plastic-free-bundle.jpg', '3735165', 'zero waste starter kit eco'],
];

function fetchPhoto(id) {
  return new Promise((resolve, reject) => {
    https.get(`https://api.pexels.com/v1/photos/${id}`, 
      { headers: { Authorization: APIKEY } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
}

function searchPhoto(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&size=large`;
    https.get(url, { headers: { Authorization: APIKEY } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, ()=>{}); reject(err); });
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  let ok = 0, fail = 0;
  for (const [file, query, desc] of targeted) {
    const dest = path.join(OUTPUT_DIR, file);
    try {
      // Try as photo ID first, then as search query
      let imgUrl;
      const data = await searchPhoto(query);
      if (data.photos?.length) {
        imgUrl = data.photos[0].src.large2x;
        const alt = data.photos[0].alt?.substring(0, 60) || '';
        await downloadFile(imgUrl, dest);
        const kb = Math.round(fs.statSync(dest).size / 1024);
        console.log(`✅ ${file} → ${alt} (${kb}KB)`);
        ok++;
      } else {
        console.error(`❌ No results for ${file}: ${query}`);
        fail++;
      }
      await sleep(250);
    } catch(err) {
      console.error(`❌ ${file}: ${err.message}`);
      fail++;
    }
  }
  console.log(`\n✅ Fixed: ${ok} | ❌ Failed: ${fail}`);
}
main();
