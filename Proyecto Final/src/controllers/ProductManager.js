import { FileManager } from "./FilesManager.js"

export class ProductManager {
    constructor (){
        this.fileManager = new FileManager("..\\Proyecto Final\\src\\models")
        this.products = []
        this.initialize()
    }

    static NextId = 0

    async initialize(){
        this.products = await this.getProducts()
        this.getNextId()
        console.log("Se ha inicializado el contructor, el siguiente ID disponible: " + ProductManager.NextId)
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

    async getProducts(limit=0){
        let products = await this.fileManager.getProductsFromFile()
        if (limit === 0)
            return products
        else
        {
            return products.slice(0 - limit)
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        if (code === '')
        {
            console.log("Error agregando producto, el campo code no puede estar vacio")
            return false
        }    
        if(this.products.find(product => product.code == code))
        {
            console.log("Error agregando producto, producto con codigo duplicado")
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
        await this.fileManager.addProductToFile(this.products)
        this.getNextId()
        console.log("Producto exitosamente agregado")
        return true
    }
    
    async getProductById(id){
        let products = await this.fileManager.getProductsFromFile()
        let product = products.find((product) => product.id === id)
        if (product)
        {
            console.log("Producto[" + id + "]: " + JSON.stringify(product))
            return JSON.stringify(product)
        }
        console.log("Producto no existente")
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
            await this.fileManager.addProductToFile(this.products)
            console.log("Producto modificado exitosamente")
            return true
        }
    }

    async deleteProduct(id){
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
        {
            console.log("Producto no existente")  
            return false  
        }
        else
        {
            this.products.splice(objIndex,1)
            await this.fileManager.addProductToFile(this.products)
            console.log("Producto eliminado")
            return true
        }
    }
}
