import { Router } from "express";
import { CartManager } from "../controllers/cart.js";

const cartRouter = Router();
const cartManager = new CartManager();

//Mostrar el carrito en navegador
cartRouter.get("/:cid", cartManager.getCart);

//Crear el car  rito desde postman
cartRouter.post("/api/create", cartManager.createCart);

//Modificar el carrito desde postman con muchos productos
cartRouter.put("/api/carts/:cid", cartManager.updateCart);

//Borra el carrito desde postman
cartRouter.delete("/api/carts/:cid", cartManager.deleteCart);

//Agrega un producto al carrito desde postman
cartRouter.post("/api/:cid/product/:pid", cartManager.addProduct);

//Modificar el producto dentro del garrito
cartRouter.put("/api/carts/:cid/products/:pid", cartManager.updateProduct);

//Borra un producto al carrito desde postman
cartRouter.delete("/api/carts/:cid/products/:pid", cartManager.deleteProduct);

export default cartRouter;
