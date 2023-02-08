import { FileManager } from "./FilesManager.js"

export class CartManager {
    constructor (){
        this.path = "..\\Proyecto Final\\src\\models\\Carrito.txt"
        this.fileManager = new FileManager(this.path)
        this.initialize()
        this.carts = []
    }

    static NextId = 0

    async initialize(){
        this.products = await this.getProducts()
        this.getNextId()
        console.log("Se ha inicializado el contructor CartManager, el siguiente ID disponible: " + CartManager.NextId)
        console.log("Con la ruta: " + this.path)
    }

    getNextId(){
        const sortedArray = this.products
            .slice()
            .sort(function (a, b) {return a.id - b.id});
        let previousId = 0;
        for (let element of sortedArray) {
            if (element.id != (previousId)) {
                ProductManager.NextId = previousId
                return
            }
            previousId++;
        }
        CartManager.NextId = previousId
    }

    async getProducts(limit=0){
        let carts = await this.fileManager.getElementsFromFile()
        if (limit === 0)
            return carts
        else
            return carts.slice(0 - limit)
    }

    async createCart(cart){
        const mewCart = {
            id: CartManager.NextId,
            products: cart.products
        }
        this.carts.push(cart)
        await this.fileManager.writeElementsToFile(this.carts)
        this.getNextId()
        console.log("Producto exitosamente agregado al carrito")
        return true
    }
    
    async getCartById(id){
        let products = await this.fileManager.getElementsFromFile()
        let product = products.find((product) => product.id === id)
        if (product)
        {
            console.log("Producto[" + id + "]: " + JSON.stringify(product))
            return JSON.stringify(product)
        }
        console.log("Producto no existente en el carrito")
        return false
    }

    async modifyProducts(id, modifiedProduct){ 
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
        {
            console.log("Falla al modificar, producto no existente en el carrito")
            return false
        }
        else
        {
            this.products[objIndex].title = modifiedProduct.title
            this.products[objIndex].description = modifiedProduct.description
            this.products[objIndex].price = modifiedProduct.price
            this.products[objIndex].thumbnail = modifiedProduct.thumbnail
            this.products[objIndex].code = modifiedProduct.code
            this.products[objIndex].stock = modifiedProduct.stock
            await this.fileManager.writeElementsToFile(this.products)
            console.log("Producto modificado exitosamente dentro del carrito")
            return true
        }
    }

    async deleteProduct(id){
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
        {
            console.log("Producto no existente en el carrito")  
            return false  
        }
        else
        {
            this.products.splice(objIndex,1)
            await this.fileManager.writeElementsToFile(this.products)
            console.log("Producto eliminado del carrito")
            return true
        }
    }
}
