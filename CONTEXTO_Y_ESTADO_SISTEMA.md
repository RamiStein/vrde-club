# 🌿 CONTEXTO Y ESTADO DEL SISTEMA — VRDE CLUB

> **Documento Maestro de Sincronización entre Conversaciones y Dispositivos**
> **Última Actualización**: 30 de Septiembre de 2026
> **Repositorio**: `https://github.com/RamiStein/vrde-club.git`
> **Ramas Activas Sincronizadas**: `main`, `master`, `eter`
> **Hosting & Producción**: **Vercel** (`https://vrde.club` / `https://www.vrde.club`)
> *(Nota: Netlify ya NO está en uso)*

---

## 🎯 1. ¿QUÉ ES VRDE CLUB? (MODELO Y FILOSOFÍA)
Vrde Club es una cooperativa y red fractal que conecta directamente a familias consumidoras (prosumidores) con productores, chacras y molinos agroecológicos de todo el país a través de dos ejes fundamentales:

1. **La Compra Lunar**: Acopio mensual masivo sincronizado con el pulso astronómico (cierra en cada Luna Llena). Al concentrar los pedidos en un pulso único mensual, se eliminan los costos de intermediación especulativa y se logra hasta un 40% de ahorro frente al supermercado.
2. **Los Nodos Almacén**: Puntos físicos de retiro barrial gestionados por vecinos y coordinadores (*Vrdedores*). No son locales impersonales; son sedes comunitarias (almacenes, garajes, espacios culturales) donde se recibe la carga, se arman los bolsones y se entregan a las familias.
3. **Los Círculos Comunitarios (Subproducto)**: Grupos de compra dentro de cada nodo (edificios, familias, amigos o compañeros de trabajo) que juntan volumen colectivo para desbloquear precios mayoristas y de distribuidor.

---

## 💻 2. STACK TECNOLÓGICO Y ARQUITECTURA REAL

* **Ubicación del Código Activo**: La aplicación en producción vive en la **raíz del proyecto** (`Web Vrde/`).
  *(Nota: La subcarpeta `/nodos-app` es un prototipo Vite/React experimental secundario; el sitio oficial y activo que se despliega en Vercel es el código estático nativo de la raíz).*
* **Frontend**: HTML5 semántico, Tailwind CSS (vía CDN + estilos personalizados en `style.css` y `lunar-style.css`), y JavaScript modular nativo (ES6+).
* **Base de Datos & Sincronización en Tiempo Real**: **Firebase Firestore** integrado directamente en `lunar-engine.js` (colecciones `orders` y `circulos`) con persistencia bidireccional en `localStorage`.
* **PWA (Progressive Web App)**:
  - `manifest.json`: Ícono oficial `favicon.png`, colores acuariana (#10B981) y modo standalone.
  - `sw.js`: Service Worker en versión **`vrde-lunar-v10`**, con estrategia **Network-First** para archivos `.js` y `.css` (evita bloqueos de caché obsoleta en clientes) y Cache-First para imágenes.
* **Hosting en Vercel**: Configurado vía `vercel.json` con `cleanUrls: true`, cabeceras `Cache-Control: public, max-age=0, must-revalidate` para código, y rewrites limpios (`/tienda`, `/lunar`, `/admin`, `/superadmin`).

---

## 📂 3. MAPA DE ARCHIVOS Y RESPONSABILIDADES

| Archivo | Rol / Funcionalidad |
| :--- | :--- |
| **`index.html`** | Portada pública pedagógica: Cuenta qué es Vrde, los 4 pilares (Compra Lunar, Nodos, Círculos, Productores), explorador de nodos y acceso a la compra. |
| **`app.js`** | Lógica de la portada (`index.html`): Observador de visibilidad, explorador dinámico de nodos, calculadora de ahorro, modales de postulación para productores y nuevos nodos. |
| **`tienda.html`** | Tienda oficial: Catálogo de alimentos por categorías, canasta, checkout por WhatsApp, selector de nodos, modal de creación y tablero de Círculos, panel del usuario. |
| **`tienda_circulos.html`** | Réplica idéntica de `tienda.html` sincronizada para compatibilidad de rutas. |
| **`lunar.html`** | Portal de Compra Lunar: Cuenta regresiva astronómica, metas colectivas, listado de sedes barriales y carruseles Spotify de Círculos Abiertos. |
| **`lunar-engine.js`** | **El motor central de datos**: Nodos oficiales, catálogo de productos con escalas de precios, cálculo de descuentos por volumen, guardado de pedidos, sincronización Firestore y manejo de sesiones. |
| **`admin.html`** | Panel Gestor de Nodo: Para el coordinador barrial. Visualiza pedidos recibidos, remito de acopio, cobros y entregas locales. |
| **`superadmin.html`** | Panel Master Central: Para administración global. Configura ciclos lunares, visualiza todos los nodos del país, agrega productos y consolida compras a chacras. |
| **`vercel.json`** | Reglas de despliegue, cleanUrls, seguridad y control de caché en Vercel. |
| **`scratch/validate_all_scripts.js`** | Script Node.js de validación sintáctica (`vm.Script`) que revisa `index.html`, `tienda.html`, `lunar.html`, `admin.html`, `superadmin.html`, `app.js`, `lunar-engine.js` y `sw.js`. |

---

## 🧭 4. ESTADO ACTUAL Y DIRECCIÓN ESTRATÉGICA (CONSENSO CON EL USUARIO)

El usuario definió las siguientes pautas de diseño y arquitectura para simplificar y ordenar el sistema:

1. **Catálogo Abierto y Directo**:
   - El visitante debe poder ver los alimentos, frescura y precios **directamente y sin registrarse previamente**.
   - No exigir formularios de login antes de mostrar el valor de la tienda.
2. **El Nodo de Referencia como Ancla Comunitaria**:
   - La persona debe entender que no compra en un ecommerce anónimo, sino **a través de su Nodo barrial más cercano**.
   - Saber quién es el coordinador/a responsable, dónde retira físicamente y qué día se entrega.
3. **La Tienda como Perfil Personalizado del Nodo**:
   - Al entrar a un nodo (ej: `tienda.html?ref=lomaverde`), la tienda adopta la estética, fotos, dirección, día de reparto y WhatsApp del coordinador de ese nodo, respaldada por la red y los productos de Vrde Club.
4. **Los Círculos como Subproducto Progresivo**:
   - Los Círculos son una herramienta mayorista excelente, pero **no deben competir ni abrumar** al comprador individual en el primer contacto.
   - Se posicionan como un subproducto dentro del nodo: una opción para que vecinos organizados o vrdedores junten pedidos y bajen el precio, difundida de boca en boca.

---

## 🛠️ 5. PROTOCOLO DE DESARROLLO Y GIT

Cada vez que se complete una tarea en cualquier conversación, se deben seguir estos pasos:

1. **Validar sintaxis sin errores**:
   ```powershell
   node scratch/validate_all_scripts.js
   ```
2. **Sincronizar réplicas**:
   ```powershell
   Copy-Item -Path "tienda.html" -Destination "tienda_circulos.html" -Force
   Copy-Item -Path "lunar-engine.js", "tienda.html", "superadmin.html", "admin.html", "index.html", "app.js", "lunar.html", "lunar-style.css", "style.css", "tienda_circulos.html", "manifest.json", "sw.js", "vercel.json" -Destination "dist\" -Force
   ```
3. **Commit y Push a las 3 ramas**:
   ```powershell
   git add -A
   git commit -m "tipo(alcance): descripcion clara del cambio"
   git push origin HEAD
   git push origin main:master -f
   git push origin main:eter -f
   ```
4. **Actualizar este documento** (`CONTEXTO_Y_ESTADO_SISTEMA.md`) si hubo cambios en la arquitectura o en las decisiones de producto.

---

## 🚀 6. PROMPT PARA INICIAR UNA NUEVA CONVERSACIÓN PARALELA

Copia y pega este texto en el primer mensaje de una nueva conversación de Antigravity:

```text
Hola! Por favor lee detalladamente el archivo CONTEXTO_Y_ESTADO_SISTEMA.md en la raíz del repositorio.
Allí está documentada la arquitectura oficial de Vrde Club (desplegada en Vercel sobre la raíz del proyecto, con HTML/CSS/JS nativo, lunar-engine.js y Firestore).
Por favor confírmame que leíste el archivo y que estás situado en el estado actual del proyecto. A partir de allí continuaremos con la siguiente tarea: [ESCRIBE AQUÍ TU TAREA ESPECÍFICA].
```
