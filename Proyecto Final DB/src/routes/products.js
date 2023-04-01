import {Router} from 'express'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: "error", error: "Usuario no loggeado" })
    }
    res.render("products")
})

export default productRouter;