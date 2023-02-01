import express from 'express'
import productRouter from './routes/product.js'

const app = express()
const PORT = 8080

app.use(express.json()) 
app.use(express.urlencoded({extended: true})) 
app.use('/products', productRouter)

//Start listening server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)    
})