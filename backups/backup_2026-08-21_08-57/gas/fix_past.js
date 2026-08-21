const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

// The corrupted block was caused by $ being interpreted as a backreference in .replace()
// Let's find the start of the block and the end of the block.
const startMarker = '      // Past Cycles';
const endMarker = '      // Members';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex > -1 && endIndex > -1) {
  const replacement = `      // Past Cycles
      var pastHtml = '';
      if (data.ciclosAnteriores && data.ciclosAnteriores.length > 0) {
        data.ciclosAnteriores.forEach(function(c) {
          pastHtml += '<div class="card cycle-card" onclick="loadPastCycle(\\'' + c.nombre + '\\')">' +
            '<div class="cycle-name">' + c.nombre + '</div>' +
            '<div class="cycle-stats">ðŸ“¦ ' + c.totalPedidos + ' | ðŸ’° $' + c.totalMonto + '</div>' +
            '</div>';
        });
      } else {
        pastHtml = '<p style="color:var(--text-muted); font-size:14px;">No hay ciclos anteriores registrados.</p>';
      }
      document.getElementById('ad-past-cycles').innerHTML = pastHtml;
      
`;

  const before = html.substring(0, startIndex);
  const after = html.substring(endIndex);
  
  fs.writeFileSync('gas/index.html', before + replacement + after, 'utf8');
  console.log('Fixed properly');
}
