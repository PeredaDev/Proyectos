import {Router} from 'express'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    res.render("products")
})

export default productRouter;