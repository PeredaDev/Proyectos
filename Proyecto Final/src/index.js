import express from 'express'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import multer from 'multer'

const app = express()
const PORT = 8080

function destination(req, file, cb) {
    return cb(null, 'src/public/img')
}

function filename(req,file, cb) {
    return cb(null, `${Date.now()}${file.originalname}`)
}

const storage = multer.diskStorage({destination, filename})
const upload= multer({storage: storage})

//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true})) 

//Routes
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)


//Multer
app.post('/upload', upload.single('image'), (req,res) => {
    console.log(req.file)
    res.send("Imagen cargada")
  })

//Start listening server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)    
})