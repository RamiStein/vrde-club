const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');
const orderCardStr = `html += '<div class="order-card">' +
            '<div class="order-row">' +
            '<span class="order-id">#' + o.id + '</span>' +
            '<span class="badge ' + badgeClass + '">' + (o.estado || 'Pendiente') + '</span>' +
            '</div>' +
            '<div class="order-row" style="margin-bottom:15px;">' +
            '<span class="order-name">' + o.nombre + '</span>' +
            '<span style="font-size:14px; color:var(--text-muted);">' + o.telefono + '</span>' +
            '</div>' +
            '<div class="order-detail">' + o.detalle + '</div>' +
            '<div class="order-row" style="margin-bottom:0; margin-top:10px;">' +
            '<span style="font-size:14px;">Unidades: <strong>' + o.unidades + '</strong></span>' +
            '<span class="order-total">$' + o.total + '</span>' +
            '</div>' +
            (isCurrentCycle || wspBtn ? '<div class="order-actions">' + actionsHtml + wspBtn + '</div>' : '') +
            '</div>';`;

// Find how many times it was duplicated
let count = html.split(orderCardStr).length - 1;
console.log('Duplicated ' + count + ' times');

if (count > 1) {
    // Replace multiple occurrences with just one
    let escaped = orderCardStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex = new RegExp('(' + escaped + ')+', 'g');
    html = html.replace(regex, orderCardStr);
    fs.writeFileSync('gas/index.html', html);
    console.log('Fixed duplications.');
}
