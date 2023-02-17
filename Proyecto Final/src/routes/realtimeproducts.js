import {Router} from 'express'
import {RealTimeManager} from "../controllers/RealTimeManager.js"

const realTimeManager = new RealTimeManager()
const realTimeProductRouter = Router()

realTimeProductRouter.get('/', async (req, res) => {
    let products = realTimeManager.products
    products.sort(function(a, b) {
        return a.id - b.id;
      });
    res.render("realTimeProducts", {
        products
    })
})

export default realTimeProductRouter;