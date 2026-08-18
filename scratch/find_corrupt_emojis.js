const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

['admin.html', 'superadmin.html', 'tienda.html', 'lunar.html', 'index.html', 'lunar-engine.js'].forEach(f => {
  const p = path.join(rootDir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const matches = [...txt.matchAll(/ðŸ[^\s<>"']*/g)].map(m => m[0]);
  console.log(f, 'corrupted matches count:', matches.length, matches.slice(0, 10));
});
