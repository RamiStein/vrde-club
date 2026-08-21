const fs = require('fs');
let html = fs.readFileSync('gas/index.html', 'utf8');

const correctBlock = `    function filterOrders(status, btnEl) {
      document.querySelectorAll('.filters .filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btnEl.classList.add('active');
      
      var filtered = CURRENT_ORDERS;
      if (status !== 'Todos') {
        filtered = CURRENT_ORDERS.filter(function(o) {
          return (o.estado || 'Pendiente').toLowerCase() === status.toLowerCase();
        });
      }
      renderOrdersList(filtered, 'ad-orders-list', true);
    }

    function changeOrderStatus(orderId, newStatus, btnEl) {
      btnEl.innerText = "...";
      btnEl.disabled = true;
      google.script.run
        .withSuccessHandler(function(r) {
          if (r.success) loadAdminDashboard();
        })
        .withFailureHandler(function(e){
          alert("Error de conexiÃ³n");
          btnEl.disabled = false;
        })
        .actualizarEstadoPedido(orderId, newStatus, CURRENT_CYCLE_NAME);
    }

    function loadPastCycle(cycleName) {
      document.getElementById('ad-past-orders-container').classList.add('hidden');
      document.getElementById('loader').classList.remove('hidden');
      document.getElementById('loader-text').innerText = "Cargando " + cycleName + "...";
      
      google.script.run
        .withSuccessHandler(function(r) {
          document.getElementById('loader').classList.add('hidden');
          document.getElementById('ad-past-orders-title').innerText = "Pedidos: " + cycleName;
          document.getElementById('ad-past-orders-container').classList.remove('hidden');
          renderOrdersList(r.pedidos, 'ad-past-orders-list', false);
          document.getElementById('ad-past-orders-container').scrollIntoView({behavior: "smooth"});
        })
        .withFailureHandler(function(){
          document.getElementById('loader').classList.add('hidden');
          alert("Error al cargar.");
        })
        .obtenerPedidosCiclo(CURRENT_REF, cycleName);
    }

    function renderMembersTable(members) {
      ADMIN_DATA.socios = members;
      drawMembersTable(members);
    }
    
    function drawMembersTable(arr) {
      var html = '';
      if(arr.length === 0) {
        html = '<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No hay socios.</td></tr>';
      } else {
        arr.forEach(function(s) {
          var wspNum = String(s.telefono).replace(/\\D/g, '');
          var wspBtn = wspNum ? '<a href="https://wa.me/549' + wspNum + '" target="_blank" style="text-decoration:none;"></a>' : '';
          html += '<tr>' +
            '<td><strong>' + s.nombre + '</strong></td>' +
            '<td>' + s.telefono + ' ' + wspBtn + '</td>' +
            '<td>' + s.totalPedidos + '</td>' +
            '<td>$' + s.totalMonto + '</td></tr>';
        });
      }
      document.getElementById('ad-members-tbody').innerHTML = html;
    }

    function filterMembers() {`;

// We'll extract everything before `function filterOrders` and after `function filterMembers() {`
const idxStart = html.indexOf('    function filterOrders(status, btnEl) {');
const idxEnd = html.indexOf('    function filterMembers() {');

if (idxStart > -1 && idxEnd > -1) {
  html = html.substring(0, idxStart) + correctBlock + html.substring(idxEnd + '    function filterMembers() {'.length);
  fs.writeFileSync('gas/index.html', html, 'utf8');
  console.log('Fixed block');
} else {
  console.log('Not found idxStart=' + idxStart + ' idxEnd=' + idxEnd);
}
