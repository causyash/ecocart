#!/usr/bin/env node
import https from 'https';
import fs from 'fs';
import path from 'path';

const APIKEY = 'lf7MJYpChJ5EiNpvrgqX1hVPdr7tjjtWAQEPj5u5mwSyya4H2PQIAOmy';
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/products');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// All new products that need images (already-downloaded ones are noted)
const products = [
  // BAGS (tote.jpg exists)
  { file: 'market-bag.jpg',     query: 'canvas market shopping bag reusable' },
  { file: 'jute-bag.jpg',       query: 'jute hessian tote bag eco grocery' },
  { file: 'hemp-crossbody.jpg', query: 'hemp crossbody shoulder bag' },
  { file: 'drawstring-bag.jpg', query: 'drawstring backpack cloth bag' },
  { file: 'mesh-bag.jpg',       query: 'mesh produce net bag fruit vegetable' },
  { file: 'nylon-backpack.jpg', query: 'recycled nylon backpack eco travel' },
  { file: 'bread-bag.jpg',      query: 'linen bread bag baguette kitchen' },
  { file: 'fold-bag.jpg',       query: 'fold up compact reusable shopping bag' },

  // TOWELS (towels.jpg exists)
  { file: 'hand-towel.jpg',     query: 'organic cotton hand towel bathroom white' },
  { file: 'face-towel.jpg',     query: 'soft face cloth bamboo washcloth' },
  { file: 'beach-towel.jpg',    query: 'colorful beach towel sand summer' },
  { file: 'kitchen-towel.jpg',  query: 'linen kitchen dish towel hanging' },
  { file: 'gym-towel.jpg',      query: 'gym sport towel fitness workout' },
  { file: 'baby-towel.jpg',     query: 'organic baby hooded bath towel' },
  { file: 'waffle-towel.jpg',   query: 'waffle weave cotton bath towel spa' },
  { file: 'dish-cloth.jpg',     query: 'reusable cotton dish cloth cleaning' },

  // BOTTLES (flask.jpg exists)
  { file: 'glass-bottle.jpg',   query: 'glass water bottle reusable hydration' },
  { file: 'bamboo-bottle.jpg',  query: 'water bottle bamboo lid wood cap' },
  { file: 'thermos.jpg',        query: 'wide mouth thermos vacuum insulated flask' },
  { file: 'copper-bottle.jpg',  query: 'copper water bottle ayurvedic traditional' },
  { file: 'kids-bottle.jpg',    query: 'kids colorful water bottle school' },
  { file: 'tumbler.jpg',        query: 'coffee travel tumbler mug stainless' },
  { file: 'silicone-bottle.jpg',query: 'collapsible silicone water bottle foldable' },
  { file: 'ceramic-mug.jpg',    query: 'ceramic travel mug coffee handmade' },

  // PERSONAL CARE (dental.jpg exists)
  { file: 'shampoo-bar.jpg',    query: 'shampoo bar solid hair care natural' },
  { file: 'conditioner-bar.jpg',query: 'conditioner bar hair solid cube natural' },
  { file: 'cotton-swabs.jpg',   query: 'bamboo cotton swabs buds eco zero waste' },
  { file: 'cotton-pads.jpg',    query: 'reusable cotton face pads rounds makeup' },
  { file: 'face-wash-bar.jpg',  query: 'solid face wash bar cleanser natural soap' },
  { file: 'deodorant.jpg',      query: 'natural deodorant stick mineral organic' },
  { file: 'lip-balm.jpg',       query: 'natural beeswax lip balm tube' },
  { file: 'safety-razor.jpg',   query: 'safety razor metal reusable grooming' },

  // STATIONERY (journal.jpg exists)
  { file: 'seed-cards.jpg',     query: 'seed paper plantable greeting cards' },
  { file: 'bamboo-pen.jpg',     query: 'bamboo pen set writing stationery' },
  { file: 'cork-notebook.jpg',  query: 'cork notebook cover eco stationery' },
  { file: 'pencil-set.jpg',     query: 'recycled pencils set colorful stationery' },
  { file: 'fountain-pen.jpg',   query: 'refillable fountain pen ink elegant' },
  { file: 'bookmark.jpg',       query: 'pressed flower bookmark dried botanical' },
  { file: 'paper-tape.jpg',     query: 'washi paper tape decorative stationery' },
  { file: 'crayons.jpg',        query: 'beeswax crayons colorful natural kids' },

  // HOME DECOR (candle.jpg exists)
  { file: 'pillar-candle.jpg',  query: 'beeswax pillar candle natural rustic' },
  { file: 'photo-frame.jpg',    query: 'wooden photo frame natural wood minimal' },
  { file: 'macrame.jpg',        query: 'macrame wall hanging boho decor' },
  { file: 'seagrass-basket.jpg',query: 'seagrass storage basket woven natural' },
  { file: 'driftwood-shelf.jpg',query: 'driftwood wooden floating shelf rustic' },
  { file: 'placemat.jpg',       query: 'woven placemat table dining natural' },
  { file: 'cork-coaster.jpg',   query: 'cork coasters set drinks natural' },
  { file: 'pressed-lamp.jpg',   query: 'pressed flower lamp botanical decor light' },

  // KITCHEN (scrubber.jpg exists)
  { file: 'beeswax-wrap.jpg',   query: 'beeswax food wrap reusable alternative' },
  { file: 'cutting-board.jpg',  query: 'bamboo cutting board kitchen wood' },
  { file: 'stretch-lids.jpg',   query: 'silicone stretch lids bowl cover food' },
  { file: 'glass-container.jpg',query: 'glass food container set storage kitchen' },
  { file: 'utensil-set.jpg',    query: 'bamboo kitchen utensil set cooking' },
  { file: 'trash-bag.jpg',      query: 'compostable trash bags green eco waste' },
  { file: 'paper-towel.jpg',    query: 'reusable cloth paper towel roll kitchen' },
  { file: 'pan-scrubber.jpg',   query: 'cast iron pan scrubber chain mail cleaner' },

  // ACCESSORIES (powerbank.jpg exists)
  { file: 'cork-wallet.jpg',    query: 'cork wallet minimalist thin vegan' },
  { file: 'sunglasses.jpg',     query: 'recycled sunglasses eco frames fashion' },
  { file: 'hemp-cap.jpg',       query: 'hemp snapback baseball cap casual' },
  { file: 'bamboo-watch.jpg',   query: 'bamboo wood watch eco wristwatch' },
  { file: 'cork-mat.jpg',       query: 'cork yoga mat exercise fitness' },
  { file: 'rubber-belt.jpg',    query: 'recycled rubber belt vegan sustainable' },
  { file: 'bamboo-stand.jpg',   query: 'bamboo laptop stand desk holder' },
  { file: 'hemp-keychain.jpg',  query: 'hemp rope keychain boho accessory' },

  // BUNDLES (bundle.jpg exists)
  { file: 'kitchen-bundle.jpg', query: 'zero waste kitchen set eco friendly' },
  { file: 'bathroom-bundle.jpg',query: 'sustainable bathroom set zero waste' },
  { file: 'travel-bundle.jpg',  query: 'eco travel kit sustainable accessories' },
  { file: 'office-bundle.jpg',  query: 'sustainable office desk stationery set' },
  { file: 'baby-bundle.jpg',    query: 'organic baby bundle natural products' },
  { file: 'chef-bundle.jpg',    query: 'eco chef kitchen gift set cooking' },
  { file: 'bedroom-bundle.jpg', query: 'sustainable bedroom natural bedding' },
  { file: 'plastic-free-bundle.jpg', query: 'plastic free starter kit zero waste' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
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
  const skip = process.argv[2] === '--skip-existing';
  let downloaded = 0, skipped = 0, failed = 0;
  
  for (const product of products) {
    const dest = path.join(OUTPUT_DIR, product.file);
    if (skip && fs.existsSync(dest)) {
      console.log(`⏭️  Skipping ${product.file} (exists)`);
      skipped++;
      continue;
    }
    
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(product.query)}&per_page=1&orientation=square&size=large`;
      const data = await fetchJson(url);
      
      if (!data.photos?.length) {
        console.error(`❌ No results for: ${product.query}`);
        failed++;
        continue;
      }
      
      const photo = data.photos[0];
      await downloadFile(photo.src.large2x, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ ${product.file} - ${photo.alt?.substring(0,60) || 'photo'} (${(size/1024).toFixed(0)}KB)`);
      downloaded++;
      await sleep(300); // Rate limit protection
    } catch (err) {
      console.error(`❌ Failed ${product.file}: ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\n📦 Done! Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
}

main();
