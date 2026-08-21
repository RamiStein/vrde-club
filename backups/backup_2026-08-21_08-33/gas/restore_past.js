const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

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

html = html.replace('      // Members', replacement + '\n      // Members');

fs.writeFileSync('gas/index.html', html, 'utf8');
console.log('Restored');
