import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

import ProductManager from "./managers/ProductManager.js";

const app = express();
const PORT = 8080;

const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager("./src/data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);

    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });

  socket.on("updateProduct", async ({ id, updates }) => {
    await productManager.updateProduct(id, updates);

    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);

    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    status: "error",
    message: err.message || "Error interno del servidor",
  });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
