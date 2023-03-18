import express from "express";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import homeRouter from "./routes/home.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils/path.js";
import { ProductManager } from "./controllers/products.js";
import { CartManager } from "./controllers/cart.js";

//Default directories
const publicDirname = __dirname + "public";
const srcDirname = __dirname + "src";

// Initialize server
const app = express();
const PORT = 8080;

//Config server
app.use(express.json());
app.use(express.static(publicDirname));
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine("views"));
app.set("view engine", "handlebars");
app.set("views", srcDirname + "\\views");

//Routes
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/home", homeRouter);

//Start listening server
const server = app.listen(PORT, () => {
  console.log("-------------------------------------------------------");
  console.log("Server initialized on port", PORT);
  console.log("Public folder:", publicDirname);
  console.log("Source folder:", srcDirname, "\n");
});

//Start objects manager
const productManager = new ProductManager();
const cartManager = new CartManager();

//Start a web socket server
const io = new Server(server);

//Web sockets funtionality
io.on("connection", (socket) => {
  updateView(socket);

  socket.on("deleteProduct", (id) => {
    if (productManager.deleteProduct(id)) updateView(socket);
  });

  socket.on("addProduct", (product) => {
    if (productManager.addProduct(product)) updateView(socket);
  });

  socket.on("modifyProduct", (modifiedProduct, id) => {
    if (productManager.modifyProducts(id, modifiedProduct)) updateView(socket);
  });
});

async function updateView(socket) {
  const products = await productManager.getProducts();
  socket.emit("update", products);
}
