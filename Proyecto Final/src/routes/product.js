import {Router} from 'express'
import {ProductManager} from "../controllers/ProductManager.js"


const productManager = new ProductManager()
const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const limit = req.query.limit == undefined? 0 : req.query.limit
    console.log("Limite de productos a mostrar: " + limit)
    let products = await productManager.getProducts(limit)
    res.send(JSON.stringify(products))
    console.log("Productos mostrados en la web \n")
})

productRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log("Obteniendo producto por ID")
    let product = await productManager.getProductById(id)
    if (product)
        res.send("Hola, este el producto: " + product + "\n")
    else
        res.send("Falla al obtener el producto \n")
})

productRouter.post('/', async (req, res) => {
    const product = req.body
    let result = await productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock)
    if (result)
        res.send("Producto agregado\n")
    else
        res.send("Falla al agregar el producto\n")
})

productRouter.put('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const product = req.body
    let result = await productManager.modifyProducts(id, product)
    if (result)
        res.send("Producto modificado")
    else
        res.send("Falla al modifciar el producto")
})

productRouter.delete('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    let result = await productManager.deleteProduct(id)
    if (result)
        res.send("Producto eliminado")
    else
        res.send("Falla al eliminar el producto")
})

export default productRouter;