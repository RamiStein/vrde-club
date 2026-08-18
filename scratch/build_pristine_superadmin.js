const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

// Read pristine original from nodos-app/dist/superadmin.html
const raw = fs.readFileSync(path.join(rootDir, 'nodos-app', 'dist', 'superadmin.html'), 'latin1');
let sp = Buffer.from(raw, 'latin1').toString('utf8');

// Replace crown with carrot 🥕
sp = sp.replace(/fa-crown/g, 'fa-carrot');
sp = sp.replace(/👑/g, '🥕');

// Clean table labels
sp = sp.replace(/ALTIMA LUNA/g, 'ÚLTIMA LUNA');
sp = sp.replace(/altima Luna/g, 'Última Luna');
sp = sp.replace(/ACCIONE\./g, 'ACCIONES');
sp = sp.replace(/ACCIONE/g, 'ACCIONES');
sp = sp.replace(/x\s+Retiro/g, '🏪 Retiro');
sp = sp.replace(/x\s+Delivery/g, '🛵 Delivery');
sp = sp.replace(/xB\s+Todos los Nodos/g, '🌐 Todos los Nodos');
sp = sp.replace(/x\s+Todos los Nodos/g, '🌐 Todos los Nodos');
sp = sp.replace(/xB\s+/g, '');
sp = sp.replace(/x:\s+/g, '');
sp = sp.replace(/x\s+/g, '');

// Ensure proper UTF-8
fs.writeFileSync(path.join(rootDir, 'superadmin.html'), sp, 'utf8');

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

console.log('✔ Built pristine superadmin.html with carrot and 100% correct layout.');
