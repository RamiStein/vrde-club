const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

['superadmin.html', 'admin.html', 'lunar.html', 'tienda.html', 'index.html'].forEach(f => {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) return;

  let txt = fs.readFileSync(p, 'utf8');

  // Replace all non-breaking spaces with standard space
  txt = txt.replace(/\u00A0/g, ' ');

  // Fix all corrupted units with spaces
  txt = txt.replace(/270p\s*1fr/g, '270px 1fr');
  txt = txt.replace(/1p\s*solid/g, '1px solid');
  txt = txt.replace(/2p\s*solid/g, '2px solid');
  txt = txt.replace(/16p\s*24px/g, '16px 24px');
  txt = txt.replace(/4p\s*15p\s*rgba/g, '4px 15px rgba');
  txt = txt.replace(/4p\s*15px\s*rgba/g, '4px 15px rgba');
  txt = txt.replace(/4p\s*10px/g, '4px 10px');
  txt = txt.replace(/24p\s*0\s*20px/g, '24px 0 20px');
  txt = txt.replace(/8p\s*16px/g, '8px 16px');
  txt = txt.replace(/14p\s*16px/g, '14px 16px');
  txt = txt.replace(/3p\s*8px/g, '3px 8px');
  txt = txt.replace(/4p\s*12px/g, '4px 12px');
  txt = txt.replace(/4p\s*8px/g, '4px 8px');
  txt = txt.replace(/20p\s*14px/g, '20px 14px');
  txt = txt.replace(/12p\s*16px/g, '12px 16px');
  txt = txt.replace(/6p\s*8p\s*12px/g, '6px 8px 12px');
  txt = txt.replace(/6p\s*8px/g, '6px 8px');
  txt = txt.replace(/overflow-auto/g, 'overflow-x: auto');

  // Replace crown with carrot 🥕
  txt = txt.replace(/fa-crown/g, 'fa-carrot');
  txt = txt.replace(/👑/g, '🥕');

  // Clean table labels
  txt = txt.replace(/ALTIMA LUNA/g, 'ÚLTIMA LUNA');
  txt = txt.replace(/altima Luna/g, 'Última Luna');
  txt = txt.replace(/ACCIONE\./g, 'ACCIONES');
  txt = txt.replace(/ACCIONE/g, 'ACCIONES');
  txt = txt.replace(/x\s+Retiro/g, '🏪 Retiro');
  txt = txt.replace(/x\s+Delivery/g, '🛵 Delivery');
  txt = txt.replace(/xB\s+Todos los Nodos/g, '🌐 Todos los Nodos');
  txt = txt.replace(/x\s+Todos los Nodos/g, '🌐 Todos los Nodos');
  txt = txt.replace(/xB\s+/g, '');
  txt = txt.replace(/x:\s+/g, '');
  txt = txt.replace(/x\s+/g, '');

  fs.writeFileSync(p, txt, 'utf8');
  console.log('✔ Cleaned nbsp & fixed CSS in:', f);
});

// Update nodos-app/dist
fs.copyFileSync(path.join(rootDir, 'superadmin.html'), path.join(rootDir, 'nodos-app', 'dist', 'superadmin.html'));

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

console.log('✔ All files fully synced to dist and DESPLEGAR_A_NETLIFY.');
