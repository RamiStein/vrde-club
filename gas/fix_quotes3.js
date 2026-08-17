const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

html = html.replace(/onerror=\\"this\.style\.display='none'; this\.parentNode\.innerText=this\.parentNode\.innerText \|\| '';\\"/g, 'onerror="this.style.display=\\\'none\\\'; this.parentNode.innerText=this.parentNode.innerText || \\\'\\\';"');

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Fixed quotes permanently');
