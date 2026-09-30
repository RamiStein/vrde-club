# Vrde Club - Proyecto Web & Plataforma de Nodos

Este documento registra el estado actual del proyecto, su arquitectura y los avances logrados hasta el momento. Sirve como punto de partida para continuar el desarrollo.

## Estado del Proyecto (Septiembre 2026)

El proyecto ha evolucionado desde una *landing page* estática hacia una **plataforma web completa (Single Page Application)** construida con React, Vite y Firebase. La arquitectura actual permite la gestión de nodos, compras comunitarias y paneles de administración.

### Stack Tecnológico
- **Frontend Framework**: React 19 + Vite.
- **Enrutamiento**: React Router v7.
- **Estilos**: Tailwind CSS v4 + PostCSS.
- **Iconografía**: Lucide React / FontAwesome.
- **Backend/BaaS**: Firebase (Autenticación y Firestore previstos/implementados a través de `firebaseService.js`).

### Estructura de la Aplicación (`/nodos-app`)
La aplicación está estructurada modularmente en `src/pages`:

1. **`Landing.jsx`**: La puerta de entrada pública que presenta el "viaje narrativo", los principios acuarianos y los ciclos de abundancia.
2. **`Portal.jsx` / `Login.jsx`**: Sistema de acceso para los diferentes roles (Consumidores, Agentes de Nodos, Administradores).
3. **`NodeSelector.jsx`**: Interfaz para que los consumidores elijan su nodo almacén barrial más cercano.
4. **`ShopView.jsx`**: La vista de la tienda comunitaria donde se visualiza el flujo de alimentos.
5. **`Dashboard.jsx`**: Panel de control (Admin de Nodo) para la gestión local, control de stock, recepción y armado de pedidos.
6. **`SuperDashboard.jsx`**: Panel de control global (Super Admin) para orquestar la gran red fractal, observar todos los nodos y organizar las compras semanales/lunares.

## Archivos Base Originales
En la raíz del proyecto (`Web Vrde/`) aún se conservan los prototipos estáticos iniciales:
- `index.html`, `style.css`, `app.js`: La landing page interactiva original que sentó las bases del diseño (glassmorphism, colores, viaje narrativo).
- `assets/`: Imágenes de apoyo conceptual (hero orgánico, logística en conjunto, nodo almacén).

## Próximos Pasos (Hoja de Ruta)
Para avanzar con **vrde.club**, se sugiere:
1. **Consolidar Firebase**: Asegurar que `firebaseService.js` esté correctamente vinculado al proyecto de Firebase de producción y que las reglas de seguridad estén configuradas.
2. **Revisión de Estilos**: Se ejecutaron varios scripts (`scratch/`) para corregir el CSS de los paneles de administración (SuperDashboard y Dashboard). Es necesario verificar en el entorno de desarrollo que todas las pantallas se vean perfectas.
3. **Flujo E2E (End-to-End)**: Probar el flujo completo: Registro/Login -> Selección de Nodo -> Compra (ShopView) -> Recepción en Nodo (Dashboard) -> Visión Global (SuperDashboard).

---
*Documento generado para registrar el trabajo y continuar la labor con libertad acuariana.*
