const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Replace all corrupted CSS properties
sp = sp.replace(/1psolid/g, '1px solid');
sp = sp.replace(/2psolid/g, '2px solid');
sp = sp.replace(/16p24px/g, '16px 24px');
sp = sp.replace(/4p15prgba/g, '4px 15px rgba');
sp = sp.replace(/4p10px/g, '4px 10px');
sp = sp.replace(/24p0 20px/g, '24px 0 20px');
sp = sp.replace(/8p16px/g, '8px 16px');
sp = sp.replace(/14p16px/g, '14px 16px');
sp = sp.replace(/3p8px/g, '3px 8px');
sp = sp.replace(/4p12px/g, '4px 12px');
sp = sp.replace(/4p8px/g, '4px 8px');
sp = sp.replace(/20p14px/g, '20px 14px');
sp = sp.replace(/12p16px/g, '12px 16px');
sp = sp.replace(/6p8px/g, '6px 8px');
sp = sp.replace(/6p8p12px/g, '6px 8px 12px');
sp = sp.replace(/270p1fr/g, '270px 1fr');
sp = sp.replace(/overflow-auto/g, 'overflow-x: auto');

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

console.log('✔ Fixed all CSS units and synced superadmin.html.');
