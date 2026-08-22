/**
 * Vrde Club - Backend API para Google Sheets
 * Este archivo va en tu Google Apps Script existente (Código.gs)
 */

var ID_HOJA = '1AotbTN241SmM_lsjrrQdbMOTtq9UDu9lyX41Ta6E0F4';
var HOJA_PEDIDOS = 'Pedidos';
var HOJA_PRODUCTOS = 'Productos';
var HOJA_NODOS = 'Nodos';

// ==========================================
// 1. RECEPCIÓN DE PEDIDOS (doPost)
// ==========================================
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(ID_HOJA);
    var sheet = ss.getSheetByName(HOJA_PEDIDOS) || ss.insertSheet(HOJA_PEDIDOS);
    
    // Si la hoja está vacía, creamos los encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'ID Pedido', 
        'Fecha', 
        'Ciclo Lunar', 
        'Nodo', 
        'Cliente', 
        'Teléfono', 
        'Detalle', 
        'Donación ($)', 
        'Total ($)', 
        'Estado', 
        'Mensaje'
      ]);
    }
    
    // Guardar el nuevo pedido en una fila
    sheet.appendRow([
      data.id || ('G-' + Math.floor(Math.random() * 900000 + 100000)),
      new Date().toLocaleString('es-AR'),
      data.ciclo || 'Ciclo Activo',
      data.nodo || 'Central',
      data.nombre,
      data.telefono,
      data.detalle,
      data.donacion || 0,
      data.total || 0,
      'Pendiente',
      data.mensaje || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      id: data.id,
      message: 'Pedido guardado con éxito en Google Sheets'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================
// 2. CONSULTA DE PEDIDOS Y ESTADOS (doGet)
// ==========================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(ID_HOJA);
    var sheet = ss.getSheetByName(HOJA_PEDIDOS);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, 
        pedidos: [] 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var rows = sheet.getDataRange().getValues();
    var headers = rows[0];
    var pedidos = [];
    
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      pedidos.push({
        id: row[0],
        fecha: row[1],
        ciclo: row[2],
        nodo: row[3],
        nombre: row[4],
        telefono: row[5],
        detalle: row[6],
        donacion: row[7],
        total: row[8],
        estado: row[9],
        mensaje: row[10]
      });
    }
    
    // Filtro por nodo si se pasa el parámetro ?ref=nodo
    var ref = (e && e.parameter && e.parameter.ref) ? e.parameter.ref.toLowerCase() : null;
    if (ref) {
      pedidos = pedidos.filter(function(p) {
        return (p.nodo || '').toLowerCase().indexOf(ref) > -1;
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      pedidos: pedidos 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
