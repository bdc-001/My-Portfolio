const fs = require('fs');
fetch('https://html.duckduckgo.com/html/?q=Aman+Gupta+boAt+image')
  .then(res => res.text())
  .then(text => {
    const match = text.match(/<img[^>]+src="([^">]+)"/g);
    console.log(match ? match.slice(0, 5) : 'No match');
  });
