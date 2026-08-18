const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

['lunar.html', 'admin.html', 'tienda.html', 'index.html'].forEach(f => {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) return;
  let txt = fs.readFileSync(p, 'utf8');

  txt = txt.replaceAll('fa-crown', 'fa-carrot');
  txt = txt.replaceAll('👑', '🥕');

  fs.writeFileSync(p, txt, 'utf8');
});

// Sync to dist and DESPLEGAR_A_NETLIFY
const origDist = path.join(rootDir, 'dist');
const easyDist = path.join(rootDir, 'DESPLEGAR_A_NETLIFY');

['superadmin.html', 'admin.html', 'lunar.html', 'tienda.html', 'index.html', 'lunar-engine.js', 'app.js', 'lunar-style.css', 'style.css', '_redirects'].forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(origDist, f));
    fs.copyFileSync(p, path.join(easyDist, f));
  }
});

console.log('✔ All files updated with carrot 🥕 and synced.');
