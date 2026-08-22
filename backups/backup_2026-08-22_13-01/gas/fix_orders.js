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

// Find the target block using indexOf to be safe from regex
const targetStr = `            '<span class="order-name">' + o.nombre + '</span>' +
            '<span style="font-size:14px; color:var(--text-muted);">' + o.telefono + '</span>' +
            '</div>' +
            '<div class="order-detail">' + o.detalle + '</div>' +
            '<div class="order-row" style="margin-bottom:0; margin-top:10px;">' +
            '<span style="font-size:14px;">Unidades: <strong>' + o.unidades + '</strong></span>' +
            '<span class="order-total">
        });
      }
      document.getElementById(containerId).innerHTML = html;
    }`;

if (html.includes(targetStr)) {
  html = html.split(targetStr).join(replacement);
  fs.writeFileSync('gas/index.html', html, 'utf8');
  console.log('Fixed');
} else {
  // Try another substring match
  const altMatch = `'<span style="font-size:14px;">Unidades: <strong>' + o.unidades + '</strong></span>' +
            '<span class="order-total">
        });`;
  const altRepl = `'<span style="font-size:14px;">Unidades: <strong>' + o.unidades + '</strong></span>' +
            '<span class="order-total">$' + o.total + '</span>' +
            '</div></div>';
        });`;
  if (html.includes(altMatch)) {
    html = html.split(altMatch).join(altRepl);
    fs.writeFileSync('gas/index.html', html, 'utf8');
    console.log('Fixed alt');
  } else {
    console.log('NOT FOUND');
  }
}
