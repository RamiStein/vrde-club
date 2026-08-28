# 📌 ESTADO ACTUAL Y PRÓXIMOS PASOS — VRDE CLUB

> **Archivo de Sincronización entre Computadoras**
> **Fecha de Actualización**: 28 de Agosto de 2026 (Madrugada)
> **Repositorio**: `https://github.com/RamiStein/vrde-club` (Rama `main` / `eter`)

---

## 🎯 1. ¿DÓNDE ESTAMOS EXACTAMENTE? (PUNTO DE REANUDACIÓN)

En la última sesión completamos dos hitos fundamentales para la plataforma:

1. **Corrección de Cálculo de Totales y Precios Unitarios**:
   * Se corrigió la función `getProductPrice` en `tienda.html` para que el cálculo de subtotales individuales aplique de forma estricta el precio correspondiente a la cantidad pedida por el comprador (Minorista 1u, Mayorista +6u, Distribuidor +12u), evitando que las unidades acumuladas en la red alteren de forma errónea el precio minorista base en el checkout.

2. **Diseño Visual de Integración de Círculos / Grupos de Compra**:
   * Se diseñaron las **maquetas de alta fidelidad** adaptando la lógica del Sandbox a la estética oficial, limpia, luminosa y orgánica de Vrde Club (fondo claro `#F8FAFC`, verde esmeralda `#10B981` / `#064E3B`, tarjetas redondeadas y tipografía *Plus Jakarta Sans*).
   * Se generaron y guardaron las imágenes oficiales en la carpeta `assets/`:
     * `assets/mockup_circulos_tienda.jpg` (Vista de la Tienda con Círculo activo y reserva a Luna Llena).
     * `assets/mockup_circulo_dashboard.jpg` (Modal de creación rápida en 15s y Tablero de Control del Anfitrión).
   * Se creó una página dedicada para visualizarlas en el navegador:
     👉 **`preview_mockups_circulos.html`** *(o `http://localhost:3000/preview_mockups_circulos.html`)*.

---

## 🎨 2. DETALLE DE LA PROPUESTA VISUAL Y FLUJO ACORDADO

### A. Vista Tienda con Círculo Activo (`assets/mockup_circulos_tienda.jpg`):
* **Banner Superior de Círculo**: Cabecera armónica que indica:  
  *`🟢 Estás pidiendo con el Círculo: Vecinos Edificio Maipú (Anfitrión: Ramiro) • Pagás al cierre`*
* **Columna Izquierda (Meta Colectiva Global)**: Barra de avance en tiempo real (ej. `22 / 40 kg`), nivel de costo desbloqueado (`$45.000/kg`) y botón directo para invitar amigos por WhatsApp y seguir sumando kilos.
* **Columna Derecha (Acceso por Bulto y Reserva)**: Opciones comerciales, invitación *`¿Querés precio Distribuidor? Juntá el bulto con tu Círculo`* y botón principal de acción:  
  **`[ Reservar para mi Círculo • Pagar en Luna Llena ]`**.

### B. Modal de Creación y Tablero del Anfitrión (`assets/mockup_circulo_dashboard.jpg`):
* **Modal de Creación (Izquierda)**: Formulario de 15 segundos (Nombre Grupo, Anfitrión, WhatsApp, Nodo) que genera el **Enlace Mágico** y el botón para compartirlo en grupos de WhatsApp.
* **Tablero del Anfitrión (Derecha)**: Panel de control con 4 métricas en vivo (*Integrantes, Kilos acumulados, Total del Grupo y Ahorro Colectivo*), listado de pedidos individuales por vecino con estado (*Pagado / Pendiente*) y botón para **Liquidar en Luna Llena**.

---

## 🧪 3. ARCHIVOS CLAVE DE CONSULTA LOCAL

1. **`preview_mockups_circulos.html`**: Previsualización visual de las dos maquetas integradas.
2. **`sandbox_circulos.html`**: Laboratorio interactivo funcional con las 4 pestañas de prueba.
3. **`propuesta_visual_circulos.md`**: Documento markdown con explicaciones detalladas y capturas.

---

## 🗺️ 4. PRÓXIMOS PASOS (PLAN DE INTEGRACIÓN EN CÓDIGO)

Cuando el usuario dé el visto bueno final para pasar del diseño al desarrollo:

1. **`lunar-engine.js` (Lógica de Círculos)**:
   * Implementar `LunarEngine.crearCirculo(...)`, `obtenerCirculo(...)` y `guardarPedidoEnCirculo(...)`.
2. **`tienda.html` (Experiencia de Compra)**:
   * Leer parámetro `?circulo=...` de la URL para activar el banner contextual y el checkout diferido a Luna Llena.
   * Agregar el botón/caja en la ficha de producto para crear o invitar a un Círculo.
3. **`index.html` y `lunar.html`**:
   * Insertar los banners y accesos rápidos para abrir Círculos barriales.
4. **`admin.html` (Gestor de Nodo)**:
   * Agrupar y consolidar los pedidos por Círculo para facilitar el acopio y la entrega al anfitrión.

---

## 💻 5. PASOS AL ABRIR LA OTRA COMPUTADORA

1. **Traer todo de GitHub**:
   ```bash
   git pull origin main
   ```

2. **Abrir la propuesta visual en el navegador**:
   Entra a:
   👉 **`http://localhost:3000/preview_mockups_circulos.html`**

3. **Prompt sugerido para Antigravity en la otra computadora**:
   > *"Hola, por favor lee ESTADO_ACTUAL_Y_PROXIMOS_PASOS.md. Ya vi la propuesta visual en preview_mockups_circulos.html. Avancemos con el Paso 1 de la integración de Círculos en lunar-engine.js y tienda.html..."*

---
*Fin del informe de sincronización — VRDE Club 2026*
