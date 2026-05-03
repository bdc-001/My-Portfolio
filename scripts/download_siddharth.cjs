const fs = require('fs');
const https = require('https');

const url = "https://www.licenseindia.com/expo/assets/img/speakers-2026/Siddharth-D.png";
const dest = "public/case-studies/siddharth-dungarwal.png";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  }
};

const request = https.get(url, options, (response) => {
  if (response.statusCode === 200) {
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log("Download completed successfully.");
    });
  } else {
    console.error(`Failed to download image. Status Code: ${response.statusCode}`);
  }
});

request.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
