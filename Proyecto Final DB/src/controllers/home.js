import productModel from "../schemas/product.js";

export class HomeManager {
  async getProducts(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const { limit, page, filter, sort } = req.query;

    const Page = page != undefined ? page : 1;
    const Limit = limit != undefined ? limit : 5;
    const Sort = sort == "asc" ? 1 : -1;
    

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
    const user = req.session.user.first_name

    console.log("\nRenderizando pagina home" + "\n");
    console.log("Total pages: " + productos.totalPages);
    console.log("Pagina: " + Page);
    console.log("Limite: " + Limit);
    console.log("Sort: " + (sort == "asc" ? "Ascendente" : "Descendente"));
    console.log(
      "Category: " +
        (filter == undefined ? "Sin filtro utilizado" : filter) +
        "\n"
    );

    if (page <= productos.totalPages || !page) {
      await res.render("home", { context, totalPages, Limit, sort, filter, user});
    } else {
      await res.send("Error, pagina fuera de rango");
    }
  }
}
