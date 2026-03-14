#!/usr/bin/env node
// Pexels Image Downloader for EcoCart Products
// Run from /Users/yash/Desktop/Home/ecocart directory
// Usage: node scripts/fetch_pexels.js "<search query>" <output_filename>

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PEXELS_API_KEY = 'lf7MJYpChJ5EiNpvrgqX1hVPdr7tjjtWAQEPj5u5mwSyya4H2PQIAOmy';
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/products');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = { headers: { 'Authorization': PEXELS_API_KEY } };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const query = process.argv[2];
  const filename = process.argv[3];

  if (!query || !filename) {
    console.error('Usage: node scripts/fetch_pexels.js "<search query>" <output_filename>');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=5&orientation=square&size=large`;

  console.log(`🔍 Searching Pexels for: "${query}"`);
  const data = await fetchJson(url);

  if (!data.photos || data.photos.length === 0) {
    console.error('❌ No photos found for query:', query);
    process.exit(1);
  }

  const photo = data.photos[0];
  const imgUrl = photo.src.large2x;
  const destPath = path.join(OUTPUT_DIR, filename);

  console.log(`📷 Found: "${photo.alt}"`);
  console.log(`   Photographer: ${photo.photographer}`);
  console.log(`   Saving to: ${destPath}`);

  await downloadFile(imgUrl, destPath);
  const stats = fs.statSync(destPath);
  console.log(`✅ Saved ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
