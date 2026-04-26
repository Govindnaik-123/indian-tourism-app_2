const fs = require('fs');

const configContent = fs.readFileSync('next.config.ts', 'utf8');
const domainRegex = /hostname:\s*["']([^"']+)["']/g;
const allowedDomains = new Set();
let match;
while ((match = domainRegex.exec(configContent)) !== null) {
  allowedDomains.add(match[1]);
}

const statesData = fs.readFileSync('src/data/statesData.ts', 'utf8');
const urlRegex = /(?:url:\s*|image:\s*)["']https?:\/\/([^/"']+)/g;

const missingDomains = new Set();
let missingCount = 0;
while ((match = urlRegex.exec(statesData)) !== null) {
  const domain = match[1];
  if (!allowedDomains.has(domain)) {
    missingDomains.add(domain);
    missingCount++;
  }
}

console.log('--- DOMAINS NOT IN next.config.ts ---');
missingDomains.forEach(d => console.log(d));
