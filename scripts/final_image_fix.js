#!/usr/bin/env node
import https from 'https';
import fs from 'fs';
import path from 'path';

const APIKEY = 'lf7MJYpChJ5EiNpvrgqX1hVPdr7tjjtWAQEPj5u5mwSyya4H2PQIAOmy';
const OUT = path.join(process.cwd(), 'public/images/products');

// Map of filename -> [Preferred Pexels ID, fallback search query]
const items = {
  // BAGS
  'tote.jpg': ['1214212', 'black cotton tote bag white background'],
  'market-bag.jpg': ['9238122', 'canvas shopping bag flat lay'],
  'mesh-bag.jpg': ['5240685', 'mesh net bag produce'],
  'nylon-backpack.jpg': ['2905238', 'blue nylon backpack product'],
  'cork-wallet.jpg': ['1188683', 'cork leather wallet product'],
  'bamboo-watch.jpg': ['190819', 'wooden watch flat lay'],
  'sunglasses.jpg': ['1493111', 'sunglasses product white background'],
  'bamboo-stand.jpg': ['4050315', 'wooden laptop stand product'],
  'hemp-keychain.jpg': ['12760205', 'macrame keychain flat lay'],

  // HOME
  'candle.jpg': ['6062139', 'scented candle jar white background'],
  'cutting-board.jpg': ['4199147', 'wooden cutting board kitchen'],
  'beeswax-wrap.jpg': ['10471682', 'beeswax wrap colorful'],
  'glass-container.jpg': ['34263267', 'glass storage jar bamboo lid'],
  'utensil-set.jpg': ['5735198', 'wooden cooking spoons set'],
  'macrame.jpg': ['14500902', 'macrame wall hanging white'],
  'photo-frame.jpg': ['15585620', 'minimalist wooden frame'],
  'seagrass-basket.jpg': ['6806509', 'woven wicker basket'],
  'scrubber.jpg': ['6634865', 'natural kitchen brush wood'],

  // PERSONAL
  'dental.jpg': ['3739121', 'bamboo toothbrush set white background'],
  'shampoo-bar.jpg': ['6930879', 'natural soap bar handmade'],
  'cotton-swabs.jpg': ['4041391', 'bamboo cotton swabs box'],
  'cotton-pads.jpg': ['4354698', 'reusable cotton rounds laundry bag'],
  'deodorant.jpg': ['28921810', 'natural deodorant stick product'],
  'lip-balm.jpg': ['17511744', 'lip balm tube product'],
  'safety-razor.jpg': ['12374351', 'silver safety razor product'],
  'face-wash-bar.jpg': ['6930879', 'facial soap bar natural'],
  'towels.jpg': ['6959146', 'rolled white cotton towels'],

  // DRINKWARE
  'flask.jpg': ['1188683', 'stainless steel water bottle white background'],
  'glass-bottle.jpg': ['33538398', 'glass water bottle minimal'],
  'bamboo-bottle.jpg': ['1000628', 'bamboo lid water bottle'],
  'thermos.jpg': ['1054366', 'thermos travel mug product'],
  'copper-bottle.jpg': ['1188683', 'copper water bottle product'],
  'kids-bottle.jpg': ['6012711', 'colorful kids water bottle'],
  'tumbler.jpg': ['1054366', 'coffee tumbler product stainless'],
  'ceramic-mug.jpg': ['1322444', 'handmade ceramic mug minimal'],
  'cork-mat.jpg': ['4050315', 'cork yoga mat rolled'],

  // STATIONERY
  'journal.jpg': ['196230', 'hardcover notebook flat lay'],
  'seed-cards.jpg': ['13627916', 'pressed flower cards stationery'],
  'cork-notebook.jpg': ['196230', 'cork cover journal notebook'],
  'bamboo-pen.jpg': ['176140', 'wooden ballpoint pen set'],
  'pencil-set.jpg': ['176140', 'colored pencils wooden box'],
  'bundle.jpg': ['1188683', 'eco products gift set flat lay'],
  'kitchen-bundle.jpg': ['1188683', 'eco kitchen products set'],
  'bathroom-bundle.jpg': ['1188683', 'eco bathroom products set'],
  'plastic-free-bundle.jpg': ['1188683', 'zero waste starter kit'],
};

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: APIKEY } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) return get(res.headers.location).then(resolve).catch(reject);
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e){ resolve(d); } });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) return download(res.headers.location, dest).then(resolve).catch(reject);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function main() {
  for (const [filename, [id, query]] of Object.entries(items)) {
    const dest = path.join(OUT, filename);
    console.log(`Working on ${filename}...`);
    try {
      let url = '';
      // Try ID first
      const photo = await get(`https://api.pexels.com/v1/photos/${id}`);
      if (photo && photo.src) {
        url = photo.src.large2x;
      } else {
        console.warn(`  ⚠️ ID ${id} failed. Searching for "${query}"...`);
        const search = await get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' product no people')}&per_page=1&orientation=square`);
        if (search && search.photos && search.photos.length) {
          url = search.photos[0].src.large2x;
        }
      }

      if (url) {
        await download(url, dest);
        console.log(`  ✅ ${filename} saved.`);
      } else {
        console.error(`  ❌ Failed to find image for ${filename}`);
      }
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      console.error(`  ❌ Error ${filename}: ${e.message}`);
    }
  }
}

main();
