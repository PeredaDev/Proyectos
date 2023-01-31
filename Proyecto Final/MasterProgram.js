import { ProductManager } from "./ProductManager.js"

let productManager = new ProductManager()

let newProduct = {
    title: "Sabrtias",
    description: "Estos son unas sabritas",
    price: 16,
    thumbnail: "Sin imagen",
    code: "tst453",
    stock: 125
}

productManager.getProducts(5)
    //Primera consulta al archivo solo regresa un array vacio
    .then(() => console.log("Productos iniciales: " + JSON.stringify(productManager.products)))
    //Agregando un producto, pero el code se repite, entonces manda error
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "001", 25))
    //Agregando un producto, pero el code esta vacio, entonces manda error
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "", 25))
    //Agregando producto
    .then(() => productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "abc123", 25))
    //Mostrando productos de nuevo para ver si el producto existe
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))
    //Buscar por id, pero el ID no existe, so regresa un error
    .then(() => productManager.getProductById(5)) 
    //Buscar por id pero si funciona
    .then(() => productManager.getProductById(0)) 
    //Modificar por ID, pero no existe el ID, so tira error
    .then(() => productManager.modifyProducts(5, newProduct))
    //Modificar por ID
    .then(() => productManager.modifyProducts(2, newProduct))
    //Consultamos el archivo modificado
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))
    //Borramos un producto pero da error por que no existe ID
    .then(() => productManager.deleteProduct(5))
    //Borrar un producto por ID
    .then(() => productManager.deleteProduct(2))
    //Mostrar de nuevo los productos sin el elemento "2"
    .then(() => productManager.getProducts().then(() => console.log("Productos actuales: " + JSON.stringify(productManager.products))))






// productManager.getProducts()
// productManager.addProduct("Sabritas","Estos son unas sabritas", 325, "Sin imagen", "", 15)
// productManager.addProduct("Sabritas","Estos son unas sabritas", 325, "Sin imagen", "001", 15)
// productManager.addProduct("Sabritas","Estos son unas sabritas", 325, "Sin imagen", "abc", 15)
// productManager.getProducts()
// productManager.getProductById(5)
// productManager.getProductById(1)
// productManager.modifyProducts(5, newProduct)
// productManager.modifyProducts(2, newProduct)
// productManager.getProducts()
// productManager.deleteProduct(2)
// productManager.getProducts()

