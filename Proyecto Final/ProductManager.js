import { FileManager } from "./FilesManager.js"

export class ProductManager {
    constructor (){
        this.fileManager = new FileManager("../Base de Datos Productos")
        this.products = []
        this.initialize()
    }

    static NextId = 0

    initialize(){
        this.getProducts()
            .then((data) => this.products = data)
            .then(() => this.getNextId())
    }

    getNextId(){
        for (const product of this.products) {
            if(product.id > ProductManager.NextId)
                ProductManager.NextId = product.id
        }
        if(this.products.length != 0)
            ProductManager.NextId++
        console.log("Se ha inicializado el contructor, el siguiente ID disponible: " + ProductManager.NextId)
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
            console.log("El campo code no puede estar vacio")
            return
        }    
        if(this.products.find(product => product.code == code))
        {
            console.log("Producto con codigo duplicado")
            return
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
        ProductManager.NextId++
        await this.fileManager.addProductToFile(this.products)
        .then(() => console.log("Producto agregado"))
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
    }

    async modifyProducts(id, modifiedProduct){ 
        let objIndex = await this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
            console.log("Producto no existente")    
        else
        {
            this.products[objIndex].title = modifiedProduct.title
            this.products[objIndex].description = modifiedProduct.description
            this.products[objIndex].price = modifiedProduct.price
            this.products[objIndex].thumbnail = modifiedProduct.thumbnail
            this.products[objIndex].code = modifiedProduct.code
            this.products[objIndex].stock = modifiedProduct.stock
            await this.fileManager.addProductToFile(this.products)
            .then( () => console.log("Producto modificado"))
        }
    }

    async deleteProduct(id){
        let objIndex = this.products.findIndex((obj => obj.id == id));
        if (objIndex==-1)
            console.log("Producto no existente")    
        else
        {
            this.products.splice(objIndex,1)
            await this.fileManager.addProductToFile(this.products)
            .then( () => console.log("Producto eliminado"))
        }
    }
}
