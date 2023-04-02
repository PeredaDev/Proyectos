import {Router} from 'express'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).render("login")
    }
    res.render("products")
})

export default productRouter;