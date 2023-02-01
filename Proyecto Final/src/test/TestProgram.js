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

// //Primera consulta al archivo solo regresa un array vacio
// let productos = await productManager.getProducts()
// console.log("Productos iniciales: " + JSON.stringify(productos))
// //Agregando un producto, pero el code se repite, entonces manda error
// await productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "001", 25)
// //Agregando un producto, pero el code esta vacio, entonces manda error
// await productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "", 25)
// //Agregando producto
// await productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "013", 25)
// //Agregando otro producto para rectificar lo del ID
// await productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "014", 25)
// //Agregando otro producto para rectificar lo del ID
// await productManager.addProduct("Producto Prueba","Esto es un producto prueba", 200, "Sin imagen", "015", 25)
// //Mostrando productos de nuevo para ver si el producto recien creado existe
// productos = await productManager.getProducts()
// console.log("Productos actuales: " + JSON.stringify(productos))
// //Buscar por id, pero el ID no existe, so regresa un error
// await productManager.getProductById(20)
// //Buscar por id pero si funciona
// await productManager.getProductById(5)
// await productManager.getProductById(9)
// //Modificar por ID, pero no existe el ID, so tira error
// await productManager.modifyProducts(20, newProduct)
// //Modificar por ID
// await productManager.modifyProducts(0, newProduct)
// //Consultamos el archivo modificado
// productos = await productManager.getProducts()
// console.log("Productos actuales: " + JSON.stringify(productos))
// //Borramos un producto pero da error por que no existe ID
// productManager.deleteProduct(20)
// //Borrar un producto por ID
// productManager.deleteProduct(14)
// //Mostrar de nuevo los productos sin el elemento "2"
let productos = await productManager.getProducts()
console.log("Productos actuales: " + JSON.stringify(productos))


