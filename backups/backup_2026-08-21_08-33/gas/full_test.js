
    window.onerror = function(msg, url, line, col, err) {
      console.error("Error capturado: " + msg + " at " + line + ":" + col);
      var statusEl = document.getElementById('status-message');
      if (statusEl) statusEl.innerText = "Error de conexiÃ³n. Intenta de nuevo.";
      return false;
    };
  