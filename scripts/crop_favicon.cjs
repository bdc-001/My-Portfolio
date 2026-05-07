const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/favicon.png');
const outputPath = path.join(__dirname, '../public/favicon.png');

async function cropFavicon() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const { width, height } = metadata;
  console.log(`Original size: ${width}x${height}`);

  // The image is a portrait (~500x500 based on the rounded square shape).
  // Face is in upper center. We want a tight headshot crop (face fills ~80%).
  // Crop: top 2% to 58% of height (head + upper chest), centered horizontally.

  const squareSize = Math.floor(height * 0.56);    // 56% of height as our square
  const cropTop = Math.floor(height * 0.01);        // start just above the head
  const centerX = Math.floor(width / 2);
  const finalLeft = Math.max(0, centerX - Math.floor(squareSize / 2));

  console.log(`Cropping: left=${finalLeft}, top=${cropTop}, size=${squareSize}x${squareSize}`);

  await sharp(inputPath)
    .extract({
      left: finalLeft,
      top: cropTop,
      width: squareSize,
      height: squareSize
    })
    .resize(512, 512, { fit: 'cover', position: 'centre' })
    .png({ quality: 95 })
    .toFile(outputPath.replace('favicon.png', 'favicon_new.png'));

  console.log('✅ Saved as favicon_new.png — preview it, then rename to favicon.png');
}

cropFavicon().catch(console.error);
