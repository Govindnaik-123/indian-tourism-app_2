const fs = require('fs');
const https = require('https');
const http = require('http');

async function checkUrl(url) {
  if (url.startsWith('/')) return { url, status: 'local' };
  
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    
    req.on('error', (e) => {
      resolve({ url, status: 'error', message: e.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'timeout' });
    });
    
    req.end();
  });
}

async function main() {
  const content = fs.readFileSync('src/data/statesData.ts', 'utf8');
  const urlRegex = /(?:url:\s*|image:\s*)["'](https?:\/\/[^"']+)["']/g;
  
  const urls = new Set();
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }
  
  console.log(`Found ${urls.size} unique URLs to check...`);
  
  const results = [];
  let i = 0;
  for (const url of urls) {
    process.stdout.write(`Checking ${++i}/${urls.size}\r`);
    const result = await checkUrl(url);
    // Ignore 2xx, 3xx. 403 usually means bot protection, 404 is not found, 400 is bad request
    if (result.status !== 200 && result.status !== 301 && result.status !== 302 && result.status !== 308) {
      results.push(result);
    }
  }
  
  console.log('\n--- BROKEN OR BLOCKED URLS ---');
  results.forEach(r => console.log(`${r.status}: ${r.url} ${r.message ? '(' + r.message + ')' : ''}`));
}

main();
