import {Router} from 'express'

const realTimeProductRouter = Router()

realTimeProductRouter.get('/', async (req, res) => {
    res.render("realTimeProducts")
})

export default realTimeProductRouter;