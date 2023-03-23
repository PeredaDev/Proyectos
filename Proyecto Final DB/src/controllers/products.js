import { mongoose } from "mongoose";
import productModel from "../schemas/product.js";

export class ProductManager {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      mongoose.set("strictQuery", false);
      // await mongoose.connect("mongodb+srv://jocapear:coderhouse@svdata.ukwp5dv.mongodb.net/products")
      await mongoose.connect("mongodb://localhost:27017/products");
    } catch {
      console.log("Error en la conexion con la base datos \n");
    }
  }

  async getProducts() {
    try {
      let products = await productModel.find();
      products = products.map(({ _id, title, description, category, price, code}) => {
        const id = _id.toString();
        return {
          id,
          title,
          description,
          category,
          price,
          code,
        };
      });
      return products;
    } catch (error) {
      console.log("Falla al obtener los productos", error);
      return false;
    }
  }

  async addProduct(product) {
    const newProduct = new productModel({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      code: product.code,
    });
    try {
      let exists = await productModel.findOne({ code: product.code });
      if (exists) {
        return false;
      } else {
        await newProduct.save();
        return true;
      }
    } catch (error) {
      console.log("Falla en la insercion en la base datos", error.toString());
      return false;
    }
  }

  async modifyProducts(id, product) {
    try {
      let exists = await productModel.findOne({ code: product.code });
      if (exists && !product.code === exists.code) {
          return false;
      } else {
        await productModel.updateOne(
          { _id: id },
          {
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            code: product.code,
          }
        );
        return true;
      }
    } catch (error) {
      console.log("Error modificando producto");
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      await productModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.log("Error elimando producto");
      return false;
    }
  }
}
