const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/images');

const pngsToConvert = [
  'andhra-pradesh.png',
  'dhuska.png',
  'vadapav.png',
  'rath_yatra.png'
];

async function convertPngToJpg(filename) {
  const pngPath = path.join(targetDir, filename);
  if (!fs.existsSync(pngPath)) {
    console.log(`File not found: ${pngPath}`);
    return;
  }

  const jpgFilename = filename.replace(/\.png$/, '.jpg');
  const jpgPath = path.join(targetDir, jpgFilename);

  try {
    const originalBuffer = fs.readFileSync(pngPath);
    let pipeline = sharp(originalBuffer);
    const metadata = await pipeline.metadata();

    if (metadata.width && metadata.width > 1200) {
      pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
    }

    // Convert to JPEG with quality 80
    const buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    fs.writeFileSync(jpgPath, buffer);
    fs.unlinkSync(pngPath);

    console.log(`Converted and optimized ${filename} -> ${jpgFilename}: ${(originalBuffer.length / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB (${Math.round((1 - buffer.length / originalBuffer.length) * 100)}% saved)`);
  } catch (err) {
    console.error(`Error converting ${filename}:`, err.message);
  }
}

(async () => {
  console.log('Starting PNG to JPG conversion...');
  for (const filename of pngsToConvert) {
    await convertPngToJpg(filename);
  }
  console.log('PNG to JPG conversion finished.');
})();
