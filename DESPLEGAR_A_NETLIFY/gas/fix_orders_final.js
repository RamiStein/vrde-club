const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

const replacement = `            '<span class="order-name">' + o.nombre + '</span>' +
            '<span style="font-size:14px; color:var(--text-muted);">' + o.telefono + '</span>' +
            '</div>' +
            '<div class="order-detail">' + o.detalle + '</div>' +
            '<div class="order-row" style="margin-bottom:0; margin-top:10px;">' +
            '<span style="font-size:14px;">Unidades: <strong>' + o.unidades + '</strong></span>' +
            '<span class="order-total">$' + o.total + '</span>' +
            '</div></div>';
        });
      }
      document.getElementById(containerId).innerHTML = html;
    }`;

const matchStr = `            '<div class="order-row" style="margin-bottom:15px;">' +`;

if (html.includes(matchStr)) {
  html = html.split(matchStr).join(matchStr + '\n' + replacement);
  fs.writeFileSync('gas/index.html', html, 'utf8');
  console.log('Fixed');
} else {
  console.log('NOT FOUND');
}
