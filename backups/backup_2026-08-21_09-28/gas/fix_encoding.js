const fs = require('fs');
let str = fs.readFileSync('gas/index.html', 'utf8');

const map = {
  'â”œÃ­': 'Ã¡',
  'â”œâŒ': 'Ã©',
  'â”œÂ¡': 'Ã­',
  'â”œâ”‚': 'Ã³',
  'â”œâ•‘': 'Ãº',
  'â”œâ–’': 'Ã±',
  'â”œÃ¼': 'Ã',
  'â”œÃ«': 'Ã‰',
  'â”œÃ¬': 'Ã',
  'â”œÃ´': 'Ã“',
  'â”œÃœ': 'Ãš',
  'â”œÂ®': 'Ã©',
  'â”¬Ã­': 'Â¡',
  'â”¬Â¿': 'Â¿'
};

for (const [bad, good] of Object.entries(map)) {
  str = str.split(bad).join(good);
}

// Now replace ALL remaining non-ASCII characters (corrupted emojis, etc.) with empty string
str = str.replace(/[^\x00-\x7FÃ¡Ã©Ã­Ã³ÃºÃ±ÃÃ‰ÃÃ“ÃšÃ‘Â¡Â¿]/g, '');

fs.writeFileSync('gas/index.html', str, 'utf8');
console.log('Cleaned file.');
