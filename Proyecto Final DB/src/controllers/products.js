import {mongoose} from 'mongoose'

export class RealTimeManager {
    constructor (){
        this.initialize()
    }

    async initialize(){
        try
        {
            await mongoose.connect('mongodb://127.0.0.1:27017/productDatabase')
            this.productSchema = new mongoose.Schema({
                title: String,
                description: String,
                price: String,
                code: Number
              })
            this.product = mongoose.model('Product', this.productSchema)
            console.log("Base de datos conectada")
        }
        catch
        {
            console.log("Error en la conexion con la base datos")
        }
    }

    async getProducts (){
        let products = await this.product.find()
        products = products.map(({_id, title, description, price, code})=>{ 
            const id = _id.toString()
            return {id, title, description, price, code};
          });
        return products
    }

    async addProduct(product){
        const newProduct = new this.product({
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code
        })
        await newProduct.save()
        return
    }

    async modifyProducts(id, product){ 
        await this.product.updateOne({ _id: id }, { title: product.title, description: product.description, price: product.price, code: product.code })
        return
    }

    async deleteProduct(id){
        await this.product.deleteOne({ _id: id })
        return
    }
}
