const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

console.log('=== REPARANDO PADDINGS, TEXTOS EN BORDES Y OVERFLOW EN ADMIN.HTML & SUPERADMIN.HTML ===');

function cleanUnits(str) {
  // 3-unit paddings: 14p16p8px -> 14px 16px 8px
  str = str.replace(/(\d+)p(\d+)p(\d+)px/g, '$1px $2px $3px');
  // 2-unit paddings: 10p12px -> 10px 12px
  str = str.replace(/(\d+)p(\d+)px/g, '$1px $2px');
  // 4-unit paddings if any: 10p12p10p12px -> 10px 12px 10px 12px
  str = str.replace(/(\d+)p(\d+)p(\d+)p(\d+)px/g, '$1px $2px $3px $4px');
  // broken flex
  str = str.replaceAll('fle1', 'flex: 1');
  // broken overflow
  str = str.replaceAll('overflow-auto;', 'overflow-x: auto;');
  str = str.replaceAll('overflow-auto', 'overflow-x: auto');
  return str;
}

// 1. ADMIN.HTML
let admin = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');
admin = cleanUnits(admin);

// Mejorar estilos de botones de filtro en admin.html para que tengan aire y no toquen los bordes
admin = admin.replace(
  /\.filter-tab-btn\s*\{[\s\S]*?\}/,
  `.filter-tab-btn {
      background: white;
      border: 1px solid var(--border-color);
      padding: 8px 18px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }`
);

// Asegurar que el layout wrapper y main view no generen overflow horizontal en el body
admin = admin.replace(
  /\.admin-layout-wrapper\s*\{[\s\S]*?\}/,
  `.admin-layout-wrapper {
      display: grid;
      grid-template-columns: 270px 1fr;
      min-height: calc(100vh - 65px);
      max-width: 1440px;
      margin: 0 auto;
      width: 100%;
      overflow-x: hidden;
    }`
);

admin = admin.replace(
  /\.admin-main-view\s*\{[\s\S]*?\}/,
  `.admin-main-view {
      padding: 24px;
      overflow-y: auto;
      overflow-x: hidden;
      min-width: 0;
      width: 100%;
    }`
);

// Asegurar body overflow-x hidden
if (!admin.includes('body { overflow-x: hidden; }') && !admin.includes('overflow-x: hidden; background-color')) {
  admin = admin.replace(
    '<body style="background-color: #F8FAFC;">',
    '<body style="background-color: #F8FAFC; overflow-x: hidden; width: 100%;">'
  );
}

fs.writeFileSync(path.join(rootDir, 'admin.html'), admin, 'utf8');
console.log('✔ admin.html reparado con éxito.');

// 2. SUPERADMIN.HTML
let sp = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');
sp = cleanUnits(sp);

sp = sp.replace(
  /\.filter-tab-btn\s*\{[\s\S]*?\}/,
  `.filter-tab-btn {
      background: white;
      border: 1px solid var(--border-color);
      padding: 8px 18px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }`
);

if (!sp.includes('overflow-x: hidden; background-color')) {
  sp = sp.replace(
    '<body style="background-color: #F8FAFC;">',
    '<body style="background-color: #F8FAFC; overflow-x: hidden; width: 100%;">'
  );
}

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), sp, 'utf8');
console.log('✔ superadmin.html reparado con éxito.');

// 3. TIENDA.HTML
let tienda = fs.readFileSync(path.join(rootDir, 'tienda.html'), 'utf8');
tienda = cleanUnits(tienda);
fs.writeFileSync(path.join(rootDir, 'tienda.html'), tienda, 'utf8');
console.log('✔ tienda.html reparado con éxito.');

// 4. LUNAR-STYLE.CSS
let css = fs.readFileSync(path.join(rootDir, 'lunar-style.css'), 'utf8');
css = cleanUnits(css);

css = css.replace(
  /\.admin-layout-wrapper\s*\{[\s\S]*?\}/,
  `.admin-layout-wrapper {
  display: grid;
  grid-template-columns: 270px 1fr;
  min-height: calc(100vh - 65px);
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
}`
);

css = css.replace(
  /\.admin-main-view\s*\{[\s\S]*?\}/,
  `.admin-main-view {
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  width: 100%;
}`
);

fs.writeFileSync(path.join(rootDir, 'lunar-style.css'), css, 'utf8');
console.log('✔ lunar-style.css reparado con éxito.');
