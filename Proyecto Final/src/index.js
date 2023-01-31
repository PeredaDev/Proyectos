import express, { response } from 'express'
import { ProductManager } from "../ProductManager.js"

const app = express()
const PORT = 4000
let productManager = new ProductManager()

app.use(express.urlencoded({extended: true})) //Permite busquedas de url complejas

app.get('/products', (req, res) => {
    const limit = req.query.limit
    if (limit > 0)
        console.log("Limite de productos a mostrar: " + limit)
    console.log("Obteniendo productos")
    productManager.getProducts(limit).then((products) => res.send(JSON.stringify(products)))    
    .then(console.log("Productos mostrados en la web"))
})

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log("Obteniendo producto por ID")
    productManager.getProductById(id).then((product) => res.send("Hola, este el producto: " + product))
})

app.get('/', (req, res) => {
    res.send("Hola, esta es la pagina de inicio")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)    
})