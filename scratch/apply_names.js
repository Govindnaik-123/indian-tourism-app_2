const fs = require('fs');

const mdContent = fs.readFileSync('scratch/image_list.md', 'utf8');
const tsContent = fs.readFileSync('src/data/statesData.ts', 'utf8');

const regex = /!\[([^\]]+)\]\(([^)]+)\)/g;
let match;
const nameMap = new Map();

while ((match = regex.exec(mdContent)) !== null) {
  const newName = match[1].trim();
  const url = match[2].trim();
  nameMap.set(url, newName);
}

console.log(`Loaded ${nameMap.size} mappings from MD.`);

let updatedTsContent = tsContent;

const tsRegex = /\{\s*url:\s*"([^"]+)",\s*name:\s*"([^"]+)"\s*\}/g;

let changesCount = 0;
updatedTsContent = tsContent.replace(tsRegex, (match, url, oldName) => {
  if (nameMap.has(url)) {
    const newName = nameMap.get(url);
    if (newName !== oldName) {
      console.log(`[UPDATE] "${oldName}" -> "${newName}"`);
      changesCount++;
      return `{ url: "${url}", name: "${newName}" }`;
    }
  } else {
    // maybe there's a slight mismatch in url?
    // Let's check if the url is found in the map by substring
    for (let [mdUrl, newName] of nameMap.entries()) {
      if (mdUrl.includes(url) || url.includes(mdUrl)) {
         if (newName !== oldName && mdUrl !== url) {
             console.log(`[MISMATCH URL] TS: ${url} != MD: ${mdUrl}`);
         }
      }
    }
  }
  return match;
});

if (changesCount > 0) {
  fs.writeFileSync('src/data/statesData.ts', updatedTsContent);
  console.log(`Successfully updated ${changesCount} image names in statesData.ts!`);
} else {
  console.log("No changes detected.");
}
