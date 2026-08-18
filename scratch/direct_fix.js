const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Rami/Desktop/Vrde Ultimo/Web Vrde';
let txt = fs.readFileSync(path.join(rootDir, 'superadmin.html'), 'utf8');

txt = txt.replaceAll('270p1fr', '270px 1fr');
txt = txt.replaceAll('1psolid', '1px solid');
txt = txt.replaceAll('2psolid', '2px solid');
txt = txt.replaceAll('16p24px', '16px 24px');
txt = txt.replaceAll('4p15prgba', '4px 15px rgba');
txt = txt.replaceAll('4p10px', '4px 10px');
txt = txt.replaceAll('24p0 20px', '24px 0 20px');
txt = txt.replaceAll('8p16px', '8px 16px');
txt = txt.replaceAll('14p16px', '14px 16px');
txt = txt.replaceAll('3p8px', '3px 8px');
txt = txt.replaceAll('4p12px', '4px 12px');
txt = txt.replaceAll('4p8px', '4px 8px');
txt = txt.replaceAll('20p14px', '20px 14px');
txt = txt.replaceAll('12p16px', '12px 16px');
txt = txt.replaceAll('6p8p12px', '6px 8px 12px');
txt = txt.replaceAll('6p8px', '6px 8px');
txt = txt.replaceAll('overflow-auto', 'overflow-x: auto');

// Replace crown with carrot 🥕
txt = txt.replaceAll('fa-crown', 'fa-carrot');
txt = txt.replaceAll('👑', '🥕');

// Clean table labels
txt = txt.replaceAll('ALTIMA LUNA', 'ÚLTIMA LUNA');
txt = txt.replaceAll('altima Luna', 'Última Luna');
txt = txt.replaceAll('ACCIONE.', 'ACCIONES');
txt = txt.replaceAll('ACCIONE', 'ACCIONES');
txt = txt.replaceAll('x Retiro', '🏪 Retiro');
txt = txt.replaceAll('x Delivery', '🛵 Delivery');
txt = txt.replaceAll('xB Todos los Nodos', '🌐 Todos los Nodos');
txt = txt.replaceAll('x Todos los Nodos', '🌐 Todos los Nodos');

fs.writeFileSync(path.join(rootDir, 'superadmin.html'), txt, 'utf8');
fs.writeFileSync(path.join(rootDir, 'nodos-app', 'dist', 'superadmin.html'), txt, 'utf8');

console.log('Result check:');
console.log('Contains 270px 1fr:', txt.includes('270px 1fr'));
console.log('Contains 1px solid:', txt.includes('1px solid'));
console.log('Contains 16px 24px:', txt.includes('16px 24px'));
console.log('Contains fa-carrot:', txt.includes('fa-carrot'));
console.log('Contains carrot emoji:', txt.includes('🥕'));
