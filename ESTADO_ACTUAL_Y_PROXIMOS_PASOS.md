# 📌 ESTADO ACTUAL Y PRÓXIMOS PASOS — VRDE CLUB

> **Archivo de Sincronización entre Computadoras**
> **Fecha de Actualización**: 28 de Agosto de 2026
> **Repositorio**: `https://github.com/RamiStein/vrde-club` (Rama `main` / `master` / `eter`)
> **Sitio Web Oficial en Producción**: `https://www.vrde.club`

---

## 🎯 1. ¿DÓNDE ESTAMOS EXACTAMENTE? (VERSION FINAL OFICIAL DESPLEGADA)

La funcionalidad de **Círculos / Grupos de Compra Comunitarios (Micro-Nodos)** y la mecánica de **Reserva y Pago Diferido en Luna Llena** ya se encuentran **100% integradas y activas en producción** en la web oficial:

1. **Tienda Oficial (`tienda.html`)**:
   * **Jerarquía Visual Clara Nodo vs. Círculo (Estética Spotify)**:
     * **Sede Central (Nodo)**: Identifica el punto oficial de acopio y logística.
     * **Estante Spotify de Círculos del Nodo**: Fila horizontal interactiva donde los vecinos pueden elegir entre comprar individual en el nodo o sumarse a un Círculo Abierto.
     * **Banner de Círculo Activo**: Muestra la insignia `🟣 CÍRCULO COMUNITARIO`, nombre del grupo, anfitrión/a, badge de privacidad (`🌐 Abierto` / `🔒 Privado`) y el Nodo cabecera de retiro.
   * **Selector de Privacidad al Crear Círculo**:
     * 🌐 **Círculo Abierto (Público)**: Visible en la tienda y en el portal lunar para que vecinos de la zona se sumen.
     * 🔒 **Círculo Cerrado (Privado)**: Oculto de las listas públicas; exclusivo para quienes reciban el link por WhatsApp.
   * **Enlaces Universales Portables (WhatsApp / Multi-dispositivo)**:
     * Los enlaces generados incluyen metadatos de auto-rescate (`c_nom`, `c_anf`, `c_wsp`, `c_tipo`, etc.) y sincronización con Firebase Firestore. Al abrir el link en cualquier smartphone nuevo o navegador limpio, la tienda reconoce de inmediato el Círculo y a su anfitrión.
   * **Cálculo de Precios Unitarios y Totales**:
     * Determinación de precios estrictamente por escala de bulto individual con sincronización de subtotales y donación del 3%.

2. **Portal Lunar (`lunar.html`)**:
   * Cada tarjeta de Nodo lista en vivo sus **Círculos Abiertos** con enlaces directos para unirse, además del acceso estándar al Nodo y el botón para abrir un nuevo Círculo.

3. **Portada Oficial (`index.html` y `app.js`)**:
   * **Nueva Sección Dedicada `#crea-tu-nodo`** con los 4 pilares de ser Nodo Almacén y formulario de postulación a WhatsApp.
   * **Explorador de Nodos Dinámico** que excluye automáticamente nodos pausados o cerrados (ej. Escobar).

4. **Panel Gestor de Nodo (`admin.html`)**:
   * Detección y etiquetas de Círculos en las tarjetas de pedidos para acopio y entrega agrupada.

5. **Motor Central (`lunar-engine.js`)**:
   * Sincronización en tiempo real con Firestore de las colecciones `orders` y `circulos`.
   * Métodos `obtenerCirculos(nodoId, soloAbiertos)`, `generarLinkCirculo(circulo)`, `crearCirculo` con soporte de privacidad.

---

## 🌐 2. ENLACES OFICIALES ACTIVOS EN PRODUCCIÓN

* 🏠 **Portada:** `https://www.vrde.club/`
* 🌑 **Portal Lunar:** `https://www.vrde.club/lunar.html`
* 🛒 **Tienda Oficial:** `https://www.vrde.club/tienda.html`
* 👥 **Crear Círculo:** `https://www.vrde.club/tienda.html?crearCirculo=true`
* 🔗 **Ejemplo Círculo Activo:** `https://www.vrde.club/tienda.html?ref=escobar&circulo=vecinos-edificio-maipu`
* 🛠️ **Panel Gestor:** `https://www.vrde.club/admin.html`

---

## 🗺️ 3. PRÓXIMAS MEJORAS Y LÍNEAS DE DESARROLLO

1. **Sincronización en la Nube (Backend)**:
   * Conectar la base de datos central (Firebase / REST API) para que los Círculos creados por un usuario se sincronicen en tiempo real entre múltiples dispositivos sin depender de enlaces con parámetros.
2. **Herramientas para el Anfitrión**:
   * Generación de PDF / Ticket imprimible con el desglose de lo que pidió cada vecino para el momento de entrega en el edificio.
   * Mensajes de cobro individual por WhatsApp listos para enviar a cada vecino al cerrar la Luna Llena.
3. **Notificaciones y Push**:
   * Avisos web / WhatsApp automáticos cuando un producto alcanza una meta de rebaja comunitaria.

---

## 💻 4. PASOS AL ABRIR LA OTRA COMPUTADORA

1. **Traer todo de GitHub**:
   ```bash
   git pull origin main
   ```

2. **Prompt sugerido para Antigravity en la otra computadora**:
   > *"Hola, por favor lee ESTADO_ACTUAL_Y_PROXIMOS_PASOS.md. Ya tenemos la versión final de Círculos desplegada en producción en vrde.club. Continuemos con las próximas mejoras..."*

---
*Fin del informe de sincronización — VRDE Club 2026*
