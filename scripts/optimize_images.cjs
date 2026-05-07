const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    input: 'src/assets/about.png',
    output: 'src/assets/about.webp',
    width: null // keep original, just convert format
  },
  {
    input: 'src/assets/HeroImageFinal.png',
    output: 'src/assets/HeroImageFinal.webp',
    width: null
  },
  {
    input: 'src/assets/tech/antigravity.png',
    output: 'src/assets/tech/antigravity.webp',
    width: 128
  },
  {
    input: 'src/assets/tech/cursor.png',
    output: 'src/assets/tech/cursor.webp',
    width: 128
  },
  {
    input: 'src/assets/tech/n8n.png',
    output: 'src/assets/tech/n8n.webp',
    width: 128
  }
];

async function optimize() {
  for (const img of imagesToOptimize) {
    const inputPath = path.join(__dirname, '..', img.input);
    const outputPath = path.join(__dirname, '..', img.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${img.input}, file not found.`);
      continue;
    }

    try {
      let pipeline = sharp(inputPath);
      if (img.width) {
        pipeline = pipeline.resize({ width: img.width });
      }
      await pipeline.webp({ quality: 80 }).toFile(outputPath);
      console.log(`Optimized: ${img.output}`);
    } catch (e) {
      console.error(`Error optimizing ${img.input}:`, e);
    }
  }
}

optimize();
