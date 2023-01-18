export class ProductManager {
    constructor (){
        this.products = []
        this.nextId = 0
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if (title == '' || description == '' || price == '' || thumbnail == ''  || code == '' || stock == '')
            return
        for (const product of this.products) {
            if(code==product.code)
            {
                console.log("Producucto con codigo duplicado")
                return
            }
        }
        let product = {
            title: title,
            description: description,
            price: price,  
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: this.nextId
        }
        this.products.push(product)
        this.nextId++
    }

    getProducts()
    {
        console.log(this.products)
    }

    getProductById(id)
    {
        let product = this.products.find((product) => product.id === id)
        if (product)
        {
            console.log(product)
            return
        }
        console.log("Producto no existente")
    }
}
