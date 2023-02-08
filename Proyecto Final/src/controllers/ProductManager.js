import { FileManager } from "./FilesManager.js"

export class ProductManager {
    constructor (){
        this.path = "..\\Proyecto Final\\src\\models\\Productos.txt"
        this.fileManager = new FileManager(this.path)
        this.products = []
        this.initialize()
    }

    static NextId = 0

    async initialize(){
        this.products = await this.getProducts()
        this.getNextId()
        console.log("Se ha inicializado el contructor ProductManager, el siguiente ID disponible: " + ProductManager.NextId)
        console.log("Con la ruta: " + this.path + "\n")
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
        ProductManager.NextId = previousId
    }

    async getProducts(limit){
        let products = await this.fileManager.getElementsFromFile()
        if (limit == undefined)
            return products
        else
            return products.slice(0 - limit)
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        if (code === '')
        {
            console.log("Error agregando producto, el campo code no puede estar vacio \n")
            return false
        }    
        if(this.products.find(product => product.code == code))
        {
            console.log("Error agregando producto, producto con codigo duplicado \n")
            return false
        }
        let product = {
            title: title,
            description: description,
            price: price,  
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ProductManager.NextId
        }
        this.products.push(product)
        await this.fileManager.writeElementsToFile(this.products)
        this.getNextId()
        console.log("Producto exitosamente agregado a la base de datos \n")
        return true
    }
    
    async getProductById(id){
        console.log("Obteniendo producto por ID")
        let products = await this.fileManager.getElementsFromFile()
        let product = products.find((product) => product.id === id)
        if (product)
        {
            console.log("Producto[" + id + "]: " + JSON.stringify(product) + "\n")
            return JSON.stringify(product)
        }
        console.log("Producto no existente en la base de datos \n")
        return false
    }

    async modifyProducts(id, modifiedProduct){ 
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
        {
            console.log("Falla al modificar, producto no existente")
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
            console.log("Producto modificado exitosamente")
            return true
        }
    }

    async deleteProduct(id){
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
        {
            console.log("Producto no existente en la base de datos \n")  
            return false  
        }
        else
        {
            this.products.splice(objIndex,1)
            await this.fileManager.writeElementsToFile(this.products)
            console.log("Producto eliminado de la base de datos \n")
            return true
        }
    }
}
