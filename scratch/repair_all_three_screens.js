const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';

console.log('=== INICIANDO REPARACIÓN DE LAS 3 PANTALLAS ===');

// ==========================================
// 1. REPARAR index.html (Tailwind classes & Hero)
// ==========================================
let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Fix all corrupted Tailwind 'fle' classes
indexHtml = indexHtml.replaceAll('flejustify-between', 'flex justify-between');
indexHtml = indexHtml.replaceAll('fleflex-col', 'flex flex-col');
indexHtml = indexHtml.replaceAll('lg:flegap-8', 'lg:flex gap-8');
indexHtml = indexHtml.replaceAll('fleitems-center', 'flex items-center');
indexHtml = indexHtml.replaceAll('flegap-', 'flex gap-');
indexHtml = indexHtml.replaceAll('flewrap', 'flex-wrap');
indexHtml = indexHtml.replaceAll('lg:fle', 'lg:flex');
indexHtml = indexHtml.replaceAll('md:fle', 'md:flex');
indexHtml = indexHtml.replaceAll('sm:fle', 'sm:flex');

// Fix hero logo container (clean modern badge instead of giant box)
const cleanHeroLogo = `
            <div class="logo-v-container fade-up mb-6 relative flex justify-center">
                <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                    <i class="fas fa-seedling text-4xl text-vrde-light"></i>
                </div>
            </div>
`;
indexHtml = indexHtml.replace(/<div class="logo-v-container[\s\S]*?<\/div>\s*<\/div>/, cleanHeroLogo);

// Ensure navbar is clean
indexHtml = indexHtml.replaceAll('fleflex-col leading-none', 'flex flex-col leading-none');
indexHtml = indexHtml.replaceAll('max-w-7xl mx-auto px-6 py-4 flex justify-between items-center', 'max-w-7xl mx-auto px-6 py-4 flex justify-between items-center');

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log('✔ index.html layout & hero logo repaired.');

// ==========================================
// 2. REPARAR lunar.html (Header & balanced 4-node grid)
// ==========================================
let lunarHtml = fs.readFileSync(path.join(rootDir, 'lunar.html'), 'utf8');

// Ensure clean header
const cleanLunarHeader = `
  <header class="shop-header" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background: white; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 50;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(16,163,82,0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 20px;">🌱</div>
      <div>
        <h1 class="shop-brand-name" style="font-size: 18px; margin: 0; line-height: 1.2;">Vrde Club</h1>
        <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Portal de Compra Colectiva Lunar</p>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <a href="superadmin.html" style="font-size: 13px; font-weight: 700; color: #EA580C; background: rgba(234,88,12,0.1); padding: 7px 14px; border-radius: 20px; text-decoration: none; border: 1px solid rgba(234,88,12,0.2); display: flex; align-items: center; gap: 6px;" title="Acceso al Panel Central Master">
        <i class="fas fa-carrot"></i> Super Admin
      </a>
      <a href="index.html" style="font-size: 13px; font-weight: 600; color: #475569; text-decoration: none; display: flex; align-items: center; gap: 6px;">
        <i class="fas fa-home"></i> Volver a la Portada
      </a>
    </div>
  </header>
`;

lunarHtml = lunarHtml.replace(/<header class="shop-header"[\s\S]*?<\/header>/, cleanLunarHeader);

// Adjust node grid CSS for 4 balanced cards
lunarHtml = lunarHtml.replace(
  /\.nodes-selection-grid\s*\{[\s\S]*?\}/,
  `.nodes-selection-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto 60px;
      padding: 0 20px;
    }`
);

fs.writeFileSync(path.join(rootDir, 'lunar.html'), lunarHtml, 'utf8');
console.log('✔ lunar.html header & 4-node grid balanced.');

// ==========================================
// 3. REPARAR superadmin.html (All 53 corrupted emojis & layout)
// ==========================================
let spHtml = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

// Replace all corrupted UTF-8 byte sequences with clean emojis
spHtml = spHtml.replaceAll('ðŸŒ•', '🌑');
spHtml = spHtml.replaceAll('ðŸŒ‘', '🌑');
spHtml = spHtml.replaceAll('ðŸ“\x8D', '📍');
spHtml = spHtml.replaceAll('ðŸ“ ', '📍');
spHtml = spHtml.replaceAll('ðŸ“', '📍');
spHtml = spHtml.replaceAll('ðŸ›µ', '🛵');
spHtml = spHtml.replaceAll('ðŸ’³', '💳');
spHtml = spHtml.replaceAll('ðŸ“¦', '📦');
spHtml = spHtml.replaceAll('ðŸ\x8F·ï¸\x8F', '🏷️');
spHtml = spHtml.replaceAll('ðŸ\x8F·', '🏷️');
spHtml = spHtml.replaceAll('ðŸ’°', '💰');
spHtml = spHtml.replaceAll('ðŸ¥•', '🥑');
spHtml = spHtml.replaceAll('ðŸŒ±', '🌱');
spHtml = spHtml.replaceAll('ðŸ‘¤', '👤');
spHtml = spHtml.replaceAll('ðŸ“…', '📅');
spHtml = spHtml.replaceAll('ðŸ“¸', '📸');
spHtml = spHtml.replaceAll('ðŸ’¬', '💬');
spHtml = spHtml.replaceAll('ðŸ›’', '🛒');
spHtml = spHtml.replaceAll('ðŸ•’', '⏰');
spHtml = spHtml.replaceAll('ðŸ“Š', '📊');
spHtml = spHtml.replaceAll('ðŸ‘¥', '👥');
spHtml = spHtml.replaceAll('ðŸ“ƒ', '📄');
spHtml = spHtml.replaceAll('ðŸ”„', '🔄');
spHtml = spHtml.replaceAll('ðŸ’¡', '💡');
spHtml = spHtml.replaceAll('ðŸ”Ž', '🔍');
spHtml = spHtml.replaceAll('ðŸŸ¢', '🟢');
spHtml = spHtml.replaceAll('ðŸŒ¿', '🌿');
spHtml = spHtml.replaceAll('ðŸ\x8Dƒ', '🍃');
spHtml = spHtml.replaceAll('ðŸŒ¾', '🌾');
spHtml = spHtml.replaceAll('ðŸ\x8DŽ', '🍎');
spHtml = spHtml.replaceAll('fa-crown', 'fa-carrot');
spHtml = spHtml.replaceAll('👑', '🥕');

// Clean any leftover ðŸ
spHtml = spHtml.replaceAll(/ðŸ[^\s<>"']*/g, '🌱');

// Fix sidebar layout & CSS units
spHtml = spHtml.replaceAll('270p1fr', '270px 1fr');
spHtml = spHtml.replaceAll('1psolid', '1px solid');
spHtml = spHtml.replaceAll('2psolid', '2px solid');
spHtml = spHtml.replaceAll('16p24px', '16px 24px');
spHtml = spHtml.replaceAll('4p15prgba', '4px 15px rgba');
spHtml = spHtml.replaceAll('4p10px', '4px 10px');
spHtml = spHtml.replaceAll('24p0 20px', '24px 0 20px');
spHtml = spHtml.replaceAll('8p16px', '8px 16px');
spHtml = spHtml.replaceAll('14p16px', '14px 16px');
spHtml = spHtml.replaceAll('3p8px', '3px 8px');
spHtml = spHtml.replaceAll('4p12px', '4px 12px');
spHtml = spHtml.replaceAll('4p8px', '4px 8px');
spHtml = spHtml.replaceAll('20p14px', '20px 14px');
spHtml = spHtml.replaceAll('12p16px', '12px 16px');
spHtml = spHtml.replaceAll('6p8p12px', '6px 8px 12px');
spHtml = spHtml.replaceAll('6p8px', '6px 8px');
spHtml = spHtml.replaceAll('overflow-auto', 'overflow-x: auto');

// Clean table labels
spHtml = spHtml.replaceAll('ALTIMA LUNA', 'ÚLTIMA LUNA');
spHtml = spHtml.replaceAll('altima Luna', 'Última Luna');
spHtml = spHtml.replaceAll('ACCIONE.', 'ACCIONES');
spHtml = spHtml.replaceAll('ACCIONE', 'ACCIONES');
spHtml = spHtml.replaceAll('x Retiro', '🏪 Retiro');
spHtml = spHtml.replaceAll('x Delivery', '🛵 Delivery');
spHtml = spHtml.replaceAll('xB Todos los Nodos', '🌐 Todos los Nodos');
spHtml = spHtml.replaceAll('x Todos los Nodos', '🌐 Todos los Nodos');

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), spHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'nodos-app', 'dist', 'superadmin.html'), spHtml, 'utf8');
console.log('✔ superadmin.html dropdown emojis & CSS units 100% repaired.');

// ==========================================
// 4. Sincronizar todos los archivos y re-comprimir
// ==========================================
const origDist = path.join(rootDir, 'dist');
const easyDist = path.join(rootDir, 'DESPLEGAR_A_NETLIFY');

['superadmin.html', 'admin.html', 'lunar.html', 'tienda.html', 'index.html', 'lunar-engine.js', 'app.js', 'lunar-style.css', 'style.css', '_redirects'].forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(origDist, f));
    fs.copyFileSync(p, path.join(easyDist, f));
  }
});

console.log('✔ Todas las páginas sincronizadas a dist y DESPLEGAR_A_NETLIFY.');
