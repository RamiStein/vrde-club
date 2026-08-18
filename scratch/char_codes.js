const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';
const lines = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8').split('\n');

const line = lines[247]; // line 248
console.log('Line 248 text:', JSON.stringify(line));
console.log('Char codes:', [...line].map(c => `${c}:${c.charCodeAt(0).toString(16)}`).join(' '));
