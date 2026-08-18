const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';
const lines = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8').split('\n');

for (let i = 240; i < 265; i++) {
  if (lines[i]) {
    console.log(`L${i + 1}: ${JSON.stringify(lines[i])}`);
  }
}
