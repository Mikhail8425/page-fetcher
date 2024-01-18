const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pageFetcher = (url, dest) => {
  request(url, (body) => {
    fs.access(dest, fs.F_OK, (err) => {
      if (err) {
        fs.writeFile(dest, body, (err) => {
          if (err) {
            console.error(err);
          };
          console.log(`Downloaded and saved to ${dest}`);
        });
        rl.close();
      }
    });
  });
};

rl.question("Enter URL: ", (pageUrl) => {
  rl.question("Save to: ", (destPath) => {
    pageFetcher(pageUrl, destPath);
  });
});