const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

let admin = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');
admin = admin.replaceAll('270p1fr', '270px 1fr');
fs.writeFileSync(path.join(rootDir, 'admin.html'), admin, 'utf8');

const origDist = path.join(rootDir, 'dist');
const easyDist = path.join(rootDir, 'DESPLEGAR_A_NETLIFY');

['superadmin.html', 'admin.html', 'lunar.html', 'tienda.html', 'index.html', 'lunar-engine.js', 'app.js', 'lunar-style.css', 'style.css', '_redirects'].forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(origDist, f));
    fs.copyFileSync(p, path.join(easyDist, f));
  }
});

console.log('✔ admin.html has 270px 1fr:', admin.includes('270px 1fr'));
