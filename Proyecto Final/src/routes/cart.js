import {Router} from 'express'
import {CartManager} from "../controllers/CartManager.js"

const cartManager = new CartManager()
const cartRouter = Router()

cartRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log("Obteniendo carrito por ID")
    let cart = await cartManager.getCartById(id)
    if (cart)
        res.send("Hola, este el carrito: " + cart)
    else
        res.send("Falla al obtener el carrito")
})

cartRouter.post('/', async (req, res) => {
    const cart = req.body
    let result = await cartManager.createCart(cart)
    if (result)
        res.send("Carrito creado")
    else
        res.send("Falla al crear el carrito")
})

cartRouter.post('/', async (req, res) => {
    const cart = req.body
    let result = await cartManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock)
    if (result)
        res.send("Producto agregado")
    else
        res.send("Falla al agregar el producto")
})


export default cartRouter;