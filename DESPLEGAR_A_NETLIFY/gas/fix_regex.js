const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

html = html.split('/file\\\\/d\\\\/([^\\\\/]+)/').join('/file\\/d\\/([^\\/]+)/');

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Fixed double backslashes');
