import cartModel from "../schemas/cart.js";
import ticketModel from "../schemas/ticket.js";
import nodemailer from "nodemailer";

export class CartManager {
  async getCart(req, res) {
    if (!req.user) {
      return res.status(401).render("login");
    }
    const cid = req.params.cid;
    let cart = await cartModel.findById(cid).populate("products._id");
    let products = cart.products;
    let goodProducts = [];
    products.forEach((product) => {
      let product2add = product._id;
      goodProducts.push(product2add);
    });
    console.log(goodProducts);
    const context = goodProducts.map((document) => {
      return {
        title: document.title,
        description: document.description,
        price: document.price,
        code: document.code,
        id: document._id.toString(),
      };
    });

    res.render("cart", { context, cid });
  }

  async createCart(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    try {
      await cartModel.create({ products: [] });
      res.send("Carrito creado");
    } catch (error) {
      console.log("Falla en la insercion en la base datos", error.toString());
      res.send("Falla al crear el carrito");
    }
  }

  async updateCart(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const cid = req.params.cid;
    const products = req.body;

    console.log(cid);
    console.log(products);

    try {
      await cartModel.updateOne(
        { _id: cid },
        {
          products: products,
        }
      );
      res.send("Carrito modificado");
    } catch (error) {
      res.send("Falla al modificar el carrito");
    }
  }

  async deleteCart(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const cid = req.params.cid;

    try {
      await cartModel.deleteOne({ _id: cid });
      res.send("Carrito borrado");
    } catch (error) {
      res.send("Falla al borrar el carrito: " + error);
    }
  }

  async purchaseCart(req, res) {
    const cid = req.params.cid;
    let cart = await cartModel.findById(cid).populate("products._id");
    let products = cart.products;
    let totalAmount = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const price = parseFloat(product._id.price);
      const quantity = product.quantity;
      const amount = price * quantity;
      totalAmount += amount;
    }
    const ticket = {
      purchase_time: Date.now(),
      purchaser: req.session.user.first_name,
      amount: totalAmount,
      products: cart.products,
    };
    await ticketModel.create(ticket);

    //setup mailer
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "qwerty12@hotmail.es",
        pass: "desmond",
      },
    });

    const mailOptions = {
      from: "qwerty12@hotmail.es",
      to: "jcpa0204@outlook.com",
      subject: "¡Hola, tu pedido ha sido procesado!",
      text: `Hola ${req.session.user.first_name}, gracias por tu pedido en Silicon Valley \n\n Aquí tenes un resumen: ${cart.products} \n\n Por el total de ${totalAmount}`
    };

    transporter.sendMail(mailOptions);
  }

  async addProduct(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const pid = req.params.pid;
    const cid = req.params.cid;

    let cart = await cartModel.findOne({ _id: cid });

    let productExists = cart.products.some((product) => product.id === pid);
    let addProduct = [];
    try {
      if (!productExists) {
        addProduct = [{ _id: pid, quantity: 1 }, ...cart.products];
      } else {
        let indexProduct = cart.products.findIndex(
          (product) => product.id === pid
        );
        cart.products[indexProduct].quantity++;
        addProduct = [...cart.products];
      }
      await cartModel.findByIdAndUpdate(cid, { products: addProduct });
      res.send("Producto agregado");
    } catch (error) {
      res.send("Falla al agregar producto el carrito" + error);
    }
  }

  async updateProduct(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const pid = req.params.pid;
    const cid = req.params.cid;
    let quantity = parseInt(req.body.quantity);

    let cart = await cartModel.findOne({ _id: cid });

    let indexProduct = cart.products.findIndex((product) => product.id === pid);
    cart.products[indexProduct].quantity = quantity;
    await cartModel.findByIdAndUpdate(cid, { products: cart.products });
    res.send(`Producto modificado (${quantity})`);
  }

  async deleteProduct(req, res) {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", error: "Usuario no loggeado" });
    }
    const pid = req.params.pid;
    const cid = req.params.cid;

    let cart = await cartModel.findOne({ _id: cid });

    let productsUpdate = cart.products.filter((product) => product.id != pid);
    await cartModel.findByIdAndUpdate(cid, { products: productsUpdate });
    res.send(`Producto eliminado (${quantity})`);
  }
}
