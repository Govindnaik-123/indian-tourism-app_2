const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/images');

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;

    let pipeline = sharp(originalBuffer);
    const metadata = await pipeline.metadata();
    
    // Resize to max width 1200px to optimize size
    if (metadata.width && metadata.width > 1200) {
      pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
    }
    
    // Add compression config
    if (ext === '.png') {
      // Use palette: true for colors quantization, which reduces size significantly (like pngquant)
      pipeline = pipeline.png({ palette: true, quality: 80 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    }

    const buffer = await pipeline.toBuffer();
    const newSize = buffer.length;

    if (newSize < originalSize) {
      fs.writeFileSync(filePath, buffer);
      console.log(`Optimized ${path.relative(targetDir, filePath)}: ${(originalSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (${Math.round((1 - newSize / originalSize) * 100)}% saved)`);
    } else {
      console.log(`Skipped ${path.relative(targetDir, filePath)}: already optimized`);
    }
  } catch (err) {
    console.error(`Error compressing ${filePath}:`, err.message);
  }
}

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
}

(async () => {
  console.log('Starting image compression in:', targetDir);
  await processDirectory(targetDir);
  console.log('Image compression finished.');
})();
