import { mongoose } from "mongoose";
import { product } from "../schemas/mongoSchemas.js";

export class RealTimeManager {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect("mongodb://127.0.0.1:27017/productDatabase");
      this.product = mongoose.model("Product", new mongoose.Schema(product));
      console.log(
        'Base de datos conectada en "127.0.0.1:27017/productDatabase"\n'
      );
    } catch {
      console.log("Error en la conexion con la base datos \n");
    }
  }

  async getProducts() {
    try {
      let products = await this.product.find();
      products = products.map(({ _id, title, description, price, code }) => {
        const id = _id.toString();
        return {
          id,
          title,
          description,
          price,
          code,
        };
      });
      return products;
    } catch (error) {
      console.log("Falla al obtener los producto");
      return false;
    }
  }

  async addProduct(product) {
    const newProduct = new this.product({
      title: product.title,
      description: product.description,
      price: product.price,
      code: product.code,
    });
    try {
      await newProduct.save();
      console.log("Producto agregado");
      return true;
    } catch (error) {
      console.log("Falla en la insercion en la base datos", error.toString());
      return false;
    }
  }

  async modifyProducts(id, product) {
    try {
      await this.product.updateOne(
        { _id: id },
        {
          title: product.title,
          description: product.description,
          price: product.price,
          code: product.code,
        }
      );
    } catch (error) {
      console.log("Error modificando producto");
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      await this.product.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.log("Error elimando producto");
      return false;
    }
  }
}
