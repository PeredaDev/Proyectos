import productModel from "../schemas/product.js";

export class HomeManager {

  async getProducts(req, res) {
    const { limit, page, filter, sort } = req.query;

    const Page = page != undefined ? page : 1;
    const Limit = limit != undefined ? limit : 5;
    const Sort = sort == "asc" ? 1 : -1;

    console.log("Pagina: " + Page);
    console.log("Limite: " + Limit);
    console.log("Sort: " + Sort);
    console.log("Category: " + filter + "\n");
    let productos = [];
    if (filter) {
      productos = await productModel.paginate(
        { category: filter },
        { limit: Limit, page: Page, sort: { price: Sort } }
      );
    } else {
      productos = await productModel.paginate(
        {},
        { limit: Limit, page: Page, sort: { price: Sort } }
      );
    }
    const totalPages = [];
    for (let index = 1; index <= productos.totalPages; index++) {
      totalPages.push(index);
    }
    const context = productos.docs.map((document) => {
      return {
        title: document.title,
        description: document.description,
        price: document.price,
        code: document.code,
        id: document._id.toString(),
      };
    });

    console.log("Pagina: " + page);
    console.log("Total pages: " + productos.totalPages);

    if (page <= productos.totalPages || !page) {
      await res.render("home", { context, totalPages, Limit, sort, filter });
    } else {
      await res.send("Error, pagina fuera de rango");
    }
  }
}
