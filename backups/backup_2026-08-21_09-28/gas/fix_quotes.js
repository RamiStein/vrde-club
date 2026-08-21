const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

html = html.split("\\\\'none\\\\'").join("'none'")
           .split("\\\\'' + ").join("'' + ")
           .split(" + '\\\\';").join(" + '';")
           .split("\\\\'").join("'");

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Fixed quotes');
