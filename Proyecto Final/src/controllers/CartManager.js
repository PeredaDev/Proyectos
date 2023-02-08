import { FileManager } from "./FilesManager.js"

export class CartManager {
    constructor (){
        this.path = "..\\Proyecto Final\\src\\models\\Carrito.txt"
        this.fileManager = new FileManager(this.path)
        this.carts = []
        this.initialize()
    }

    static NextId = 0

    async initialize(){
        this.carts = await this.getCarts()
        this.getNextId()
        console.log("Se ha inicializado el contructor CartManager, el siguiente ID disponible: " + CartManager.NextId)
        console.log("Con la ruta: " + this.path + "\n")
    }

    getNextId(){
        const sortedArray = this.carts
            .slice()
            .sort(function (a, b) {return a.id - b.id});
        let previousId = 0;
        for (let element of sortedArray) {
            if (element.id != (previousId)) {
                CartManager.NextId = previousId
                return
            }
            previousId++;
        }
        CartManager.NextId = previousId
    }

    async getCarts(limit=0){
        let carts = await this.fileManager.getElementsFromFile()
        if (limit === 0)
            return carts
        else
            return carts.slice(0 - limit)
    }

    async createCart(cart){
        const newCart = {
            id: CartManager.NextId,
            products: cart.products
        }
        this.carts.push(newCart)
        await this.fileManager.writeElementsToFile(this.carts)
        this.getNextId()
        console.log("Carrito creado exitosamente")
        return true
    }
    
    async getCartById(id){
        this.carts = await this.fileManager.getElementsFromFile()
        let cart = this.carts.find((cart) => cart.id === id)
        if (cart)
        {
            console.log("Carrito[" + id + "]: " + JSON.stringify(cart))
            return JSON.stringify(cart)
        }
        console.log("Producto no existente en el carrito")
        return false
    }

    async addProduct(pid, cid){ 
        this.carts = await this.fileManager.getElementsFromFile()
        console.log(this.carts)
        let objIndex = this.carts.findIndex((obj => obj.id === cid));
        console.log("Index carrito: "+ objIndex)
        if (objIndex==-1)
        {
            console.log("Falla al modificar, carrito no existente")
            return false
        }
        let productIndex = this.carts[objIndex].products.findIndex((obj => obj.id === pid))
        console.log("Index objeto " + productIndex)
        if (productIndex==-1)
        {
            const productCart = {
                id: pid, 
                quantity: 1
            }
            this.carts[objIndex].products.push(productCart)
            await this.fileManager.writeElementsToFile(this.carts)
            console.log("Producto agregado exitosamente dentro del carrito")
            return true
        }
        else
        {
            this.carts[objIndex].products[productIndex].quantity++
            await this.fileManager.writeElementsToFile(this.carts)
            console.log("Producto modificado exitosamente dentro del carrito")
            return true
        }
    }
}
