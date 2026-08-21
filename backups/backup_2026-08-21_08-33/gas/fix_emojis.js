const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

html = html.replace('<div class="back-btn" onclick="goHome()">Ã‰</div>', '<div class="back-btn" onclick="goHome()">â¬…ï¸</div>')
           .replace('<strong>Ã± Contacto:</strong>', '<strong>ðŸ“± Contacto:</strong>')
           .replace('<strong> DirecciÃ³n:</strong>', '<strong>ðŸ“ DirecciÃ³n:</strong>')
           .replace('<strong> Entrega:</strong>', '<strong>ðŸšš Entrega:</strong>');

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Fixed emojis');
