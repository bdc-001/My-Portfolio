const fs = require('fs');
fetch('https://img.etimg.com/thumb/msid-87948293,width-1200,height-900,imgsize-38148,overlay-etpanache/photo.jpg')
  .then(r => r.arrayBuffer())
  .then(b => {
    fs.writeFileSync('public/case-studies/aman-gupta.jpg', Buffer.from(b));
    console.log("Downloaded to public/case-studies/aman-gupta.jpg");
  });
