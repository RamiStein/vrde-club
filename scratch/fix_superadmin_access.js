const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

// 1. Fix superadmin.html CSS and icons
let spHtml = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Fix CSS broken p units
spHtml = spHtml.replace(/16p24px/g, '16px 24px');
spHtml = spHtml.replace(/4p15prgba/g, '4px 15px rgba');
spHtml = spHtml.replace(/4p10px/g, '4px 10px');
spHtml = spHtml.replace(/24p0 20px/g, '24px 0 20px');
spHtml = spHtml.replace(/2psolid/g, '2px solid');
spHtml = spHtml.replace(/8p16px/g, '8px 16px');
spHtml = spHtml.replace(/1psolid/g, '1px solid');
spHtml = spHtml.replace(/14p16px/g, '14px 16px');
spHtml = spHtml.replace(/3p8px/g, '3px 8px');
spHtml = spHtml.replace(/270p1fr/g, '270px 1fr');
spHtml = spHtml.replace(/20p14px/g, '20px 14px');
spHtml = spHtml.replace(/12p16px/g, '12px 16px');
spHtml = spHtml.replace(/6p8p12px/g, '6px 8px 12px');
spHtml = spHtml.replace(/4p8px/g, '4px 8px');
spHtml = spHtml.replace(/x"/g, '👑');
spHtml = spHtml.replace(/x:/g, '🚚');
spHtml = spHtml.replace(/x /g, '📍');

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), spHtml, 'utf8');
console.log('✔ superadmin.html CSS and icons fixed.');

// 2. Add Super Admin button to lunar.html header and footer
let lunarHtml = fs.readFileSync(path.join(rootDir, 'lunar.html'), 'utf8');

const lunarHeaderButtons = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <a href="superadmin.html" style="font-size: 13px; font-weight: 700; color: #EA580C; background: rgba(234,88,12,0.1); padding: 8px 16px; border-radius: 20px; text-decoration: none; border: 1px solid rgba(234,88,12,0.2); display: flex; align-items: center; gap: 6px;" title="Acceso al Panel Central Master">
        <i class="fas fa-crown"></i> Super Admin
      </a>
      <a href="index.html" style="font-size: 13px; font-weight: 600; color: #475569; text-decoration: none; display: flex; align-items: center; gap: 6px;">
        <i class="fas fa-home"></i> Volver a la Portada
      </a>
    </div>
`;

lunarHtml = lunarHtml.replace(/<a href="index\.html"[\s\S]*?<\/a>/, lunarHeaderButtons);

const lunarFooterLink = `
  <footer style="background: white; border-top: 1px solid var(--border-color); padding: 30px 20px; text-align: center; font-size: 13px; color: var(--text-muted);">
    <p style="margin-bottom: 8px;"><strong>Vrde Club</strong> • Soberanía Alimentaria & Red de Almacenes Agroecológicos</p>
    <p style="margin-bottom: 12px;">Sincronizado con el calendario astronómico 2026-2027.</p>
    <a href="superadmin.html" style="color: #EA580C; font-weight: 700; text-decoration: none; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; background: rgba(234,88,12,0.08); padding: 6px 14px; border-radius: 15px;">
      <i class="fas fa-crown"></i> Acceso al Panel Super Admin Central
    </a>
  </footer>
`;

lunarHtml = lunarHtml.replace(/<footer[\s\S]*?<\/footer>/, lunarFooterLink);
fs.writeFileSync(path.join(rootDir, 'lunar.html'), lunarHtml, 'utf8');
console.log('✔ lunar.html updated with Super Admin header and footer buttons.');

// 3. Add Super Admin button to admin.html header & login screen
let adminHtml = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');

if (!adminHtml.includes('superadmin.html')) {
  adminHtml = adminHtml.replace(
    '<div style="display: flex; gap: 10px; align-items: center;">',
    `<div style="display: flex; gap: 10px; align-items: center;">
        <a href="superadmin.html" style="padding: 8px 14px; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 20px; background: rgba(234,88,12,0.1); color: #EA580C; border: 1px solid rgba(234,88,12,0.2); display: flex; align-items: center; gap: 6px;">
          <i class="fas fa-crown"></i> Super Admin
        </a>`
  );

  adminHtml = adminHtml.replace(
    '<a href="index.html" style="color: var(--text-muted); text-decoration: none;">',
    `<a href="superadmin.html" style="color: #EA580C; text-decoration: none; font-weight: 600; margin-right: 12px;">
          <i class="fas fa-crown"></i> Super Admin
        </a>
        <a href="index.html" style="color: var(--text-muted); text-decoration: none;">`
  );
}

fs.writeFileSync(path.join(rootDir, 'admin.html'), adminHtml, 'utf8');
console.log('✔ admin.html updated with Super Admin button.');

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

console.log('✔ All files synced to dist and DESPLEGAR_A_NETLIFY.');
