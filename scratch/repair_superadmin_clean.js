const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

// 1. Clean superadmin.html
let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Replace any crown icons/emojis with carrot 🥕
sp = sp.replace(/fa-crown/g, 'fa-carrot');
sp = sp.replace(/👑/g, '🥕');

// Clean all CSS unit corruption
sp = sp.replace(/270p📍1fr/g, '270px 1fr');
sp = sp.replace(/270p1fr/g, '270px 1fr');
sp = sp.replace(/1p📍solid/g, '1px solid');
sp = sp.replace(/1psolid/g, '1px solid');
sp = sp.replace(/2p📍solid/g, '2px solid');
sp = sp.replace(/2psolid/g, '2px solid');
sp = sp.replace(/20p📍14px/g, '20px 14px');
sp = sp.replace(/20p14px/g, '20px 14px');
sp = sp.replace(/12p📍16px/g, '12px 16px');
sp = sp.replace(/12p16px/g, '12px 16px');
sp = sp.replace(/8p📍16px/g, '8px 16px');
sp = sp.replace(/8p16px/g, '8px 16px');
sp = sp.replace(/4p📍15p/g, '4px 15px');
sp = sp.replace(/4p15p/g, '4px 15px');
sp = sp.replace(/4p📍10px/g, '4px 10px');
sp = sp.replace(/4p10px/g, '4px 10px');
sp = sp.replace(/16p📍24px/g, '16px 24px');
sp = sp.replace(/16p24px/g, '16px 24px');
sp = sp.replace(/24p📍0/g, '24px 0');
sp = sp.replace(/24p0/g, '24px 0');
sp = sp.replace(/14p📍16px/g, '14px 16px');
sp = sp.replace(/14p16px/g, '14px 16px');
sp = sp.replace(/3p📍8px/g, '3px 8px');
sp = sp.replace(/3p8px/g, '3px 8px');
sp = sp.replace(/6p📍8p📍12px/g, '6px 8px 12px');
sp = sp.replace(/6p8p12px/g, '6px 8px 12px');
sp = sp.replace(/4p📍8px/g, '4px 8px');
sp = sp.replace(/4p8px/g, '4px 8px');
sp = sp.replace(/p📍/g, 'px ');

// Clean table labels and remnants
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
console.log('✔ superadmin.html completely repaired with 🥕 and 270px 1fr sidebar.');

// 2. Clean lunar.html with 🥕
let lunar = fs.readFileSync(path.join(rootDir, 'lunar.html'), 'utf8');
lunar = lunar.replace(/fa-crown/g, 'fa-carrot');
lunar = lunar.replace(/👑/g, '🥕');
fs.writeFileSync(path.join(rootDir, 'lunar.html'), lunar, 'utf8');
console.log('✔ lunar.html updated with 🥕 carrot.');

// 3. Clean admin.html with 🥕
let admin = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');
admin = admin.replace(/fa-crown/g, 'fa-carrot');
admin = admin.replace(/👑/g, '🥕');
fs.writeFileSync(path.join(rootDir, 'admin.html'), admin, 'utf8');
console.log('✔ admin.html updated with 🥕 carrot.');

// 4. Sync all files to dist and DESPLEGAR_A_NETLIFY
const origDist = path.join(rootDir, 'dist');
const easyDist = path.join(rootDir, 'DESPLEGAR_A_NETLIFY');

['admin.html', 'index.html', 'lunar.html', 'superadmin.html', 'tienda.html', 'lunar-engine.js', 'app.js', 'lunar-style.css', 'style.css', '_redirects'].forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(origDist, f));
    fs.copyFileSync(p, path.join(easyDist, f));
  }
});

console.log('✔ All files updated and synced to dist & DESPLEGAR_A_NETLIFY.');
