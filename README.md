# 🛒 Backend Ecommerce

API REST desarrollada con **Node.js y Express** para la gestión de productos y carritos de compra. Además, el proyecto incluye renderizado de vistas con Handlebars y actualización de productos en tiempo real utilizando Socket.io.

La persistencia de datos se realiza mediante archivos JSON (`products.json` y `carts.json`).

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Express Handlebars
- Socket.io
- File System (fs)

---

## 📂 Estructura del Proyecto

```bash
BackendE2_Cook
├── src
│ ├── app.js
│ ├── routes
│ │ ├── products.router.js
│ │ └── carts.router.js
│ │ └── views.router.js
│ ├── managers
│ │ ├── ProductManager.js
│ │ └── CartManager.js
│ │ ├── public
│ │ └── js
│      └── realtime.js
│ │ ├── views
│ │ ├── layouts
│ │ │ └── main.handlebars
│ │ │
│ │ ├── home.handlebars
│ │ └── realTimeProducts.handlebars
│ │
│ └── data
│ ├── products.json
│ └── carts.json
├── .gitignore
├── package.json
└── README.md
```

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/carocook/BackendE2_Cook.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor:

```bash
npm run dev
```

4. El servidor se ejecuta en:

```bash
http://localhost:8080
```

## 🖥️ Vistas disponibles

Página principal
http://localhost:8080/

Muestra la lista de productos renderizada con Handlebars.

### Productos en tiempo real

http://localhost:8080/realtimeproducts

Panel interactivo que permite:

📦 visualizar productos

➕ agregar productos

✏️ editar productos

❌ eliminar productos

La lista se actualiza automáticamente utilizando WebSockets con Socket.io.

---

## 👩‍💻 Desarrollado por

**Carolina Cook**
