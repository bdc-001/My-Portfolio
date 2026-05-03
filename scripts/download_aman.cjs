const fs = require('fs');
const https = require('https');

// Trying a Forbes India URL which is usually more stable
const url = "https://www.forbesindia.com/media/images/2022/Jan/img_176505_amangupta.jpg";
const dest = "public/case-studies/aman-gupta.jpg";

const request = https.get(url, (response) => {
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
