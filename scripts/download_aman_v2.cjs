const fs = require('fs');
const https = require('https');

const url = "https://img.etimg.com/thumb/msid-125719833,width-1200,height-900,imgsize-26466,resizemode-4/aman-gupta.jpg";
const dest = "public/case-studies/aman-gupta.jpg";

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
