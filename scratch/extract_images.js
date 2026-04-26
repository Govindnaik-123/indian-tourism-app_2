const fs = require('fs');
const content = fs.readFileSync('src/data/statesData.ts', 'utf8');

// Match each state block
const stateRegex = /name:\s*"([^"]+)",[\s\S]*?culturalImages:\s*\[([\s\S]*?)\]/g;
let match;

let output = "# Image Name Verification\n\nPlease review the following list of all images and their associated names (the text that appears when you hover over them). \n\n**Let me know which names need to be changed to better match their pictures, and I will update them all at once.**\n\n## User Review Required\n> [!IMPORTANT]\n> Scroll through the states below and reply with a list of the incorrect names and what you'd like them changed to (e.g. \"Change 'Tribal Art' in Assam to 'Bihu Festival'\").\n\n";

while ((match = stateRegex.exec(content)) !== null) {
  const stateName = match[1];
  const imagesBlock = match[2];
  
  output += `### ${stateName}\n`;
  output += `| Image Name (Hover Text) | Image Preview |\n`;
  output += `|---|---|\n`;
  
  const imgRegex = /\{\s*url:\s*"([^"]+)",\s*name:\s*"([^"]+)"\s*\}/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(imagesBlock)) !== null) {
    const url = imgMatch[1];
    const name = imgMatch[2];
    
    // Convert absolute paths for local images if necessary, though absolute github paths won't work easily here.
    // Assuming standard urls or absolute local paths
    let displayUrl = url;
    if (url.startsWith('/images/')) {
        // Just print the name for local ones, since they won't render in MD without a host
        displayUrl = `Local File: \`${url}\``;
    } else {
        displayUrl = `![${name}](${url})`;
    }
    
    output += `| **${name}** | ${displayUrl} |\n`;
  }
  output += "\n---\n\n";
}

fs.writeFileSync('scratch/image_list.md', output);
