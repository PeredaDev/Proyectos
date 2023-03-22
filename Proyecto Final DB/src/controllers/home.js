import { mongoose } from "mongoose";
import productModel from "../schemas/product.js";

export class HomeManager {
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

  async getProducts(req, res) {
    const { limit, page, filter, sort } = req.query;

    const Page = page != undefined ? page : 1;
    const Limit = limit != undefined ? limit : 1;
    const Sort = sort == "asc" ? 1 : -1;
    
    console.log("Pagina: " + Page)
    console.log("Limite: " + Limit)
    console.log("Sort: " + Sort)
    console.log("Category: " + filter + "\n")
    let productos = []
    if (filter)
    {
      productos = await productModel.paginate({ category: filter }, { limit: Limit, page: Page, sort: { price: Sort } })
    }
    else
    {
      productos = await productModel.paginate({}, { limit: Limit, page: Page, sort: { price: Sort } })
    }
    console.log(productos)
    const context =  productos.docs.map( document => 
        {
          return {
            title: document.title,
            description: document.description,
            price: document.price,
            code: document.code,
            id: document._id.toString()
          }
        })
    
    await res.render("home", {context})
  }
}
