import { __dirname } from "./utils/path.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./controllers/products.js";
import express from "express";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import homeRouter from "./routes/home.js";
import userRouter from "./routes/user.js";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import connectionMongoose from "./utils/connection.js";
import passport from 'passport'
import initializePassport from './config/passport.js'

console.clear()

// Default directories
const publicDirname = __dirname + "public";
const srcDirname = __dirname + "src";

// Setup for passport
const setup = 
{
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_CONNECTION_LOCAL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 30,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}

// Initialize server
const app = express();
const PORT = 8080;

// Config server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirname));
app.use(session(setup))
app.engine("handlebars", engine("views"));
app.set("view engine", "handlebars");
app.set("views", srcDirname + "\\views");

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);

//Start listening server
const server = app.listen(PORT, () => {
  console.log("-------------------------------------------------------------------------------------");
  console.log("Server initialized on port", PORT);
  console.log("Public folder:", publicDirname);
  console.log("Source folder:", srcDirname, "\n");
});

//Start objects manager
const productManager = new ProductManager();

//Start a web socket server
const io = new Server(server);

//Web sockets funtionality
io.on("connection", async (socket) => {
  updateView(socket);
  
  socket.on("deleteProduct", (id) => {
    if (productManager.deleteProduct(id)) updateView(socket);
  });

  socket.on("addProduct", async (product) => {
    if (await productManager.addProduct(product)) {
      updateView(socket);
    } else {
      socket.emit("codeExists", product.code);
    }
  });

  socket.on("modifyProduct", async (modifiedProduct, id) => {
    if (await productManager.modifyProducts(id, modifiedProduct)) {
      updateView(socket);
    } else {
      socket.emit("codeExists", modifiedProduct.code);
    }
  });
});

async function updateView(socket) {
  const products = await productManager.getProducts();
  socket.emit("update", products);
}
