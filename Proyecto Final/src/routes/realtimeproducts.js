import {Router} from 'express'
import {RealTimeManager} from "../controllers/RealTimeManager.js"

const realTimeManager = new RealTimeManager()
const realTimeProductRouter = Router()

realTimeProductRouter.get('/', async (req, res) => {
    let products = realTimeManager.products
    res.render("realTimeProducts", {
        products
    })
})

realTimeProductRouter.post('/', async (req, res) => {
    const product = req.body
    let result = await realTimeManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock)
    if (result)
    {
        let products = realTimeManager.products
        res.render("realTimeProducts", {
            products
        })
    }
    else
        res.send("Falla al agregar el producto\n")
})

realTimeProductRouter.put('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const product = req.body
    let result = await realTimeManager.modifyProducts(id, product)
    if (result)
        res.send("Producto modificado")
    else
        res.send("Falla al modifciar el producto")
})

realTimeProductRouter.delete('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    let result = await realTimeManager.deleteProduct(id)
    if (result)
        res.send("Producto eliminado")
    else
        res.send("Falla al eliminar el producto")
})

export default realTimeProductRouter;