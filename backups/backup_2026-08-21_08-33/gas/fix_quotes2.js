const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

// We have 3 occurrences of this onerror handler
html = html.replace(/onerror="[^"]+"/g, function(match) {
  return "onerror=\\\"this.style.display='none'; this.parentNode.innerText=this.parentNode.innerText || '';\\\"";
});

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Fixed quotes properly');
