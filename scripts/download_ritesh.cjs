const fs = require('fs');
const https = require('https');

const url = "https://www.bookmyartistindia.com/wp-content/uploads/2024/10/Ritesh-Agarwal.jpg";
const dest = "public/case-studies/ritesh-agarwal.jpg";

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
