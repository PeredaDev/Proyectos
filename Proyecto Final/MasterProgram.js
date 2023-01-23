import { ProductManager } from "./ProductManager.js"

let productManager = new ProductManager()

let newProduct = {
    title: "Tostitos",
    description: "Estos son unos tostitos",
    price: 16,
    thumbnail: "Sin imagen",
    code: "tst453",
    stock: 125
}

productManager.getProducts()
    .then(() => console.log("Productos iniciales: " + JSON.stringify(productManager.products)))
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "001", 25))
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "", 25))
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "abc123", 25))
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))
    .then(() => productManager.getProductById(5)) 
    .then(() => productManager.getProductById(0)) 
    .then(() => productManager.getProductById(2))
    .then(() => productManager.modifyProducts(5, newProduct))
    .then(() => productManager.modifyProducts(2, newProduct))
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))
    .then(() => productManager.deleteProduct(2))
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))






// productManager.getProducts()
// productManager.addProduct("Tostitos","Estos son unos tostitos", 325, "Sin imagen", "", 15)
// productManager.addProduct("Tostitos","Estos son unos tostitos", 325, "Sin imagen", "001", 15)
// productManager.addProduct("Tostitos","Estos son unos tostitos", 325, "Sin imagen", "tst453", 15)
// productManager.getProducts()
// productManager.getProductById(5)
// productManager.getProductById(1)
// productManager.modifyProducts(5, newProduct)
// productManager.modifyProducts(2, newProduct)
// productManager.getProducts()
// productManager.deleteProduct(2)
// productManager.getProducts()

