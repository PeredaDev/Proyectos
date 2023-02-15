import express from 'express'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import realtimeProductRouter from './routes/realtimeproducts.js'
import multer from 'multer'
import {engine} from 'express-handlebars'
import {Server} from "socket.io";

//Create an express server
const app = express()
const PORT = 8080

//Start listening server
const server = app.listen(PORT, () => {
  console.log(`\nServer on port ${PORT} \n`)    
})

const io = new Server(server);


//Multer cb functions
function destination(req, file, cb) {
  return cb(null, 'src/public/img')
}
function filename(req,file, cb) {
  return cb(null, `${Date.now()}${file.originalname}`)
}

//Multer
const storage = multer.diskStorage({destination, filename})
const upload= multer({storage: storage})

//Configurations for the server
app.use(express.json()) 
app.use(express.urlencoded({extended: true})) 
app.engine("handlebars", engine()) 
app.set("view engine", "handlebars")
app.set("views", "src\\views") 

io.on("connection", (socket) => {
  console.log("Conexion con socket")
  socket.on('mensaje', info =>{ //Captura de info de cliente
    console.log(info)
  })
  socket.broadcast.emit('evento-admin', 'Hola desde server, sos el admin') //brodcast = se va a poder escuchar en mi app menos en el socket actual
  socket.emit('evento-general', "Hola a todo/as los/as usuarios/as")
})

//Routes
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/realtimeproducts', realtimeProductRouter)

//------------ End points ------------

//Multer
app.post('/upload', upload.single('image'), (req,res) => {
  res.send("Imagen cargada")
})
