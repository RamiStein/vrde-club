const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Replace any icon with carrot 🥕
sp = sp.replace(/ðŸ¥•/g, '🥕');
sp = sp.replace(/fa-crown/g, 'fa-carrot');
sp = sp.replace(/👑/g, '🥕');
sp = sp.replace(/<span style="font-size: 28px;">.*?<\/span>/g, '<span style="font-size: 28px;">🥕</span>');

// Clean inline styles
sp = sp.replace(/8p16px/g, '8px 16px');
sp = sp.replace(/1psolid/g, '1px solid');
sp = sp.replace(/placeholder="â€¢â€¢â€¢â€¢"/g, 'placeholder="••••"');

// Fix Mojibake
sp = sp.replace(/Tienda PÃºblica/g, 'Tienda Pública');
sp = sp.replace(/Tienda P\x{00FA}blica/g, 'Tienda Pública');
sp = sp.replace(/AdministraciÃ³n/g, 'Administración');
sp = sp.replace(/catÃ¡logo/g, 'catálogo');
sp = sp.replace(/MÃ³dulos/g, 'Módulos');
sp = sp.replace(/CatÃ¡logo/g, 'Catálogo');
sp = sp.replace(/SECCI N/g, 'SECCIÓN');
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

// Fix Spanish accents in JS tables
sp = sp.replace(/Ã¡/g, 'á');
sp = sp.replace(/Ã©/g, 'é');
sp = sp.replace(/Ã­/g, 'í');
sp = sp.replace(/Ã³/g, 'ó');
sp = sp.replace(/Ãº/g, 'ú');
sp = sp.replace(/Ã±/g, 'ñ');
sp = sp.replace(/Ã /g, 'Á');
sp = sp.replace(/Ã‰/g, 'É');
sp = sp.replace(/Ã /g, 'Í');
sp = sp.replace(/Ã“/g, 'Ó');
sp = sp.replace(/Ãš/g, 'Ú');
sp = sp.replace(/Ã‘/g, 'Ñ');

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), sp, 'utf8');
console.log('✔ superadmin.html finalized with carrot and clean Spanish accents.');

// Update lunar.html & admin.html buttons to carrot 🥕
['lunar.html', 'admin.html', 'index.html', 'tienda.html'].forEach(f => {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) return;
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(/fa-crown/g, 'fa-carrot');
  txt = txt.replace(/👑/g, '🥕');
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

console.log('✔ All files synced with carrot 🥕.');
