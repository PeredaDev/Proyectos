import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productCollection = "product"

const productSchema = Schema({
    title: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: String
    },
    code: {
        type: Number,
        index: true,
        unique: true
    },
})

productSchema.plugin(paginate)

const productModel = model(productCollection, productSchema)

export default productModel
