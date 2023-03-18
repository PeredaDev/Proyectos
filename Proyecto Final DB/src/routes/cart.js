import {Router} from 'express'

const cartRouter = Router()

cartRouter.get('/', async (req, res) => {
    res.render("cart")
})

export default cartRouter;