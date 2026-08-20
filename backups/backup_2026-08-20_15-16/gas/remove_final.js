const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

// Replace members table
html = html.replace(/html \+= `\s*<tr>\s*<td><strong>\$\{s\.nombre\}<\/strong><\/td>\s*<td>\$\{s\.telefono\} \$\{wspBtn\}<\/td>\s*<td>\$\{s\.totalPedidos\}<\/td>\s*<td>\$\$\{s\.totalGastado\}<\/td>\s*<td style="font-size:12px; color:var\(--text-muted\);">\$\{s\.ultimoPedido \|\| '-'\}<\/td>\s*<\/tr>\s*`;/g, 
`html += '<tr>' +
  '<td><strong>' + s.nombre + '</strong></td>' +
  '<td>' + s.telefono + ' ' + wspBtn + '</td>' +
  '<td>' + s.totalPedidos + '</td>' +
  '<td>$' + s.totalGastado + '</td>' +
  '<td style="font-size:12px; color:var(--text-muted);">' + (s.ultimoPedido || '-') + '</td>' +
'</tr>';`);

// Replace past cycle
html = html.replace(/pastHtml \+= `\s*<div class="card cycle-card" onclick="loadPastCycle\('\$\{c\.nombre\}'\)">\s*<div class="cycle-name">\$\{c\.nombre\}<\/div>\s*<div class="cycle-stats">ðŸ“¦ \$\{c\.totalPedidos\} \| ðŸ’° \$\$\{c\.totalMonto\}<\/div>\s*<\/div>\s*`;/g, 
`pastHtml += '<div class="card cycle-card" onclick="loadPastCycle(\\'' + c.nombre + '\\')">' +
  '<div class="cycle-name">' + c.nombre + '</div>' +
  '<div class="cycle-stats">ðŸ“¦ ' + c.totalPedidos + ' | ðŸ’° $' + c.totalMonto + '</div>' +
'</div>';`);

fs.writeFileSync('gas/index.html', html, 'utf8');

let remaining = html.indexOf(String.fromCharCode(96));
if (remaining > -1) {
  console.log("Still has backticks at " + remaining);
} else {
  console.log("ALL BACKTICKS REMOVED");
}
