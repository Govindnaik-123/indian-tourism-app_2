const fs = require('fs');
const path = require('path');

const filePaths = [
  path.join(__dirname, '../src/data/destinations.ts'),
  path.join(__dirname, '../src/data/statesData.ts'),
  path.join(__dirname, '../src/data/tourismData.ts'),
  path.join(__dirname, '../src/data/indiaDestinations.ts')
];

// Regex to capture image URLs in double quotes, single quotes, or backticks
const urlRegex = /https?:\/\/[^\s'"`()]+(?:\?[^\s'"`()]*)?/g;

const foundUrls = new Set();

for (const fp of filePaths) {
  if (fs.existsSync(fp)) {
    const content = fs.readFileSync(fp, 'utf8');
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      let url = match[0];
      // Strip trailing characters like commas, semicolons, quotes
      url = url.replace(/[,;'"\)}]+$/, '');
      if (url.includes('unsplash.com') || url.includes('photo') || url.includes('image') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.webp')) {
        foundUrls.add(url);
      }
    }
  }
}

console.log(`Found ${foundUrls.size} unique image-like URLs. Checking status...`);

async function testUrls() {
  const urlList = Array.from(foundUrls);
  const broken = [];
  
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(6000)
      });
      
      if (!res.ok) {
        console.log(`[BROKEN] ${url} -> Status ${res.status}`);
        broken.push({ url, status: res.status });
      }
    } catch (err) {
      console.log(`[FAILED] ${url} -> ${err.message}`);
      broken.push({ url, error: err.message });
    }
  }
  
  console.log('\n--- BROKEN/FAILED URLS ---');
  console.log(JSON.stringify(broken, null, 2));
}

testUrls();
