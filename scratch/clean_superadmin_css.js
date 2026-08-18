const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Clean regex for all CSS units in superadmin.html
sp = sp.replace(/(\d+)p(\d+)px/g, '$1px $2px');
sp = sp.replace(/(\d+)p(\d+)p/g, '$1px $2px');
sp = sp.replace(/(\d+)psolid/g, '$1px solid');
sp = sp.replace(/(\d+)p(?=[;\s\}])/g, '$1px');
sp = sp.replace(/(\d+)p(?=[a-zA-Z])/g, '$1px ');
sp = sp.replace(/1px solid📍/g, '1px solid');
sp = sp.replace(/📍rgba/g, 'rgba');
sp = sp.replace(/📍/g, '');

// Clean any leftover x in table rendering
sp = sp.replace(/x\s+Retiro/g, '🏪 Retiro');
sp = sp.replace(/x\s+Delivery/g, '🛵 Delivery');
sp = sp.replace(/xB\s+Todos/g, '🌐 Todos');
sp = sp.replace(/x\s+Todos/g, '🌐 Todos');
sp = sp.replace(/xB\s+/g, '');
sp = sp.replace(/x\s+/g, '');
sp = sp.replace(/x:\s+/g, '');

// Ensure carrot icon and 270px 1fr sidebar layout
sp = sp.replace(/fa-crown/g, 'fa-carrot');
sp = sp.replace(/👑/g, '🥕');

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

console.log('✔ Cleaned all CSS units and synced superadmin.html.');
