# 📌 ESTADO ACTUAL Y PRÓXIMOS PASOS — VRDE CLUB

> **Archivo de Sincronización entre Computadoras**
> **Fecha de Actualización**: 27 de Agosto de 2026
> **Repositorio**: `https://github.com/RamiStein/vrde-club` (Rama `main`)

---

## 🎯 1. ¿DÓNDE ESTAMOS EXACTAMENTE? (PUNTO DE REANUDACIÓN)

En la última sesión definimos la visión y creamos el **entorno de pruebas local aislado (Sandbox)** para la funcionalidad más innovadora de Vrde Club: **Los Círculos y Grupos de Compra Comunitarios (Micro-Nodos)**.

Todo el código oficial (`tienda.html`, `lunar.html`, `admin.html`) está **100% intacto y protegido**, y se creó un laboratorio interactivo:
* **Archivo de prueba**: [`sandbox_circulos.html`](file:///c:/Users/VRDE/Desktop/Web%20Vrde/sandbox_circulos.html)
* **URL local para probar**: `http://localhost:3000/sandbox_circulos.html`

---

## 🧠 2. RESUMEN DE LA MECÁNICA ACORDADA

1. **La Dinámica de Reserva Colectiva**:
   * El prosumidor reserva con **"Precio Máximo Garantizado"** (lo máximo que pagará).
   * No se paga en el momento del pedido, sino que la compra se consolida y **se liquida en Luna Llena (cierre de ciclo)** al mejor valor alcanzado por la red.
   * Quien compra como Mayorista (+6u) o Distribuidor (+12u o +50u) accede a descuentos por bulto y a la vez impulsa la meta global de toda la comunidad.

2. **Avisos Automáticos de Rebaja (Price Drop Alerts)**:
   * Notificaciones automáticas por Web Push, WhatsApp y Email cada vez que la red cruza un hito y el precio de un producto reservado baja.

3. **Círculos / Grupos de Compra (Micro-Nodos)**:
   * Cualquier usuario puede ser **Anfitrión de su Círculo** (ej. *"Vecinos Edificio Maipú"*, *"Familia Gómez"*).
   * Genera un **Enlace Mágico de Invitación** para enviar por WhatsApp.
   * Los vecinos/amigos piden individualmente, la app consolida la entrega en el punto del anfitrión y le entrega a cada integrante su ticket exacto rebajado para transferir en Luna Llena.

4. **Los 3 Puntos de Acceso**:
   * 🏡 **Portada / Home (`index.html`)**: Para invitar a crear comunidades barriales.
   * 🌑 **Portal Lunar (`lunar.html`)**: Para usuarios que no tienen un nodo cerca y quieren abrir su propio punto.
   * 🛒 **Ficha de Producto (`tienda.html`)**: Debajo del precio Distribuidor, para incentivar a juntar el bulto entre amigos.

---

## 🧪 3. QUÉ CONTIENE EL SANDBOX (`sandbox_circulos.html`)

Al abrir `http://localhost:3000/sandbox_circulos.html` en el navegador puedes interactuar con 4 pestañas:
1. **Pestaña 1 (Puntos de Acceso)**: Maquetas interactivas de las 3 pantallas de entrada.
2. **Pestaña 2 (Modal Crear Círculo)**: Formulario de 15 segundos que genera el link y el mensaje de WhatsApp.
3. **Pestaña 3 (Vista Invitado)**: Simulador donde puedes agregar pedidos como diferentes vecinos.
4. **Pestaña 4 (Tablero del Anfitrión)**: Métricas en tiempo real, desglose de pedidos por vecino y simulador de liquidación de Luna Llena.

---

## 💻 4. PASOS EXACTOS AL ABRIR LA OTRA COMPUTADORA

1. **Traer todo de GitHub**:
   Abre la terminal en la carpeta `Web Vrde` y corre:
   ```bash
   git pull origin main
   ```

2. **Abrir el Sandbox en tu navegador**:
   Entra a:
   👉 **`http://localhost:3000/sandbox_circulos.html`**

3. **Prompt para enviar a Antigravity en la otra computadora**:
   Solo copia y pega este mensaje:
   > *"Hola, por favor lee el archivo `ESTADO_ACTUAL_Y_PROXIMOS_PASOS.md`. Ya estoy en esta computadora y acabo de hacer `git pull`. Estuvimos definiendo los Círculos / Grupos de Compra Comunitarios y probando `sandbox_circulos.html`. Continuemos desde aquí para [revisar el sandbox / pasar a la integración en tienda / etc.]"*

---
*Fin del informe de sincronización — VRDE Club 2026*
