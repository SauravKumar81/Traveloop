const fs = require('fs');
const path = require('path');
const https = require('https');

const rawData = fs.readFileSync('C:\\Users\\Saura\\.gemini\\antigravity\\brain\\73d68619-df65-4b34-bbb3-dd28f37d5209\\.system_generated\\steps\\426\\output.txt', 'utf8');
const data = JSON.parse(rawData);

const outDir = path.join(__dirname, 'client', 'stitch-designs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve();
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const screens = data.screens;
  for (const screen of screens) {
    const title = screen.title.replace(/[^a-zA-Z0-9]/g, '_');
    console.log(`Downloading ${title}...`);
    
    if (screen.htmlCode && screen.htmlCode.downloadUrl) {
      const htmlPath = path.join(outDir, `${title}.html`);
      await download(screen.htmlCode.downloadUrl, htmlPath);
    }
    
    if (screen.screenshot && screen.screenshot.downloadUrl) {
      const imgPath = path.join(outDir, `${title}.png`);
      await download(`${screen.screenshot.downloadUrl}=w${screen.width || 1024}`, imgPath);
    }
  }
  console.log('Done!');
}

main().catch(console.error);
