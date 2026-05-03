const fs = require('fs');
const https = require('https');

const url = "https://images.livemint.com/img/2022/10/25/1140x641/Aman_Gupta_1666687071987_1666687072175_1666687072175.png";
const dest = "public/case-studies/aman-gupta.png";

https.get(url, (res) => {
  if (res.statusCode === 200) {
    res.pipe(fs.createWriteStream(dest));
    console.log("Downloaded");
  } else {
    console.log("Failed: " + res.statusCode);
  }
});
