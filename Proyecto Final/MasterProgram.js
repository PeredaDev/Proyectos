import { ProductManager } from "./ProductManager.js"

let productManager = new ProductManager()
productManager.getProducts()
productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getProducts()
productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("Tostitos","Estos son unos tostitos", 325, "Sin imagen", "tst453", 15)
productManager.getProducts()
productManager.getProductById(2)
productManager.getProductById(0)

