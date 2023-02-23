import express from 'express'
import {engine} from 'express-handlebars'
import {Server} from 'socket.io'
import {__dirname} from './utils/path.js'
import producsRouter from './routes/products.js'
import {RealTimeManager} from "./controllers/products.js"

//Default directories
const publicDirname = __dirname + "public"
const srcDirname = __dirname + "src"

// Initialize server
const app = express()
const PORT = 8080

//Config server
app.use(express.json()) 
app.use(express.static(publicDirname));
app.use(express.urlencoded({extended: true})) 
app.engine("handlebars", engine("views")) 
app.set("view engine", "handlebars")
app.set("views", srcDirname + "\\views") 

//Routes
app.use('/products', producsRouter)

//Start listening server
const server = app.listen(PORT, () => {
    console.log("-------------------------------------------------------")  
    console.log("Server initialized on port",PORT)  
    console.log("Public folder:", publicDirname,)  
    console.log("Source folder:", srcDirname,'\n')  

})

//Start product manager
const realTimeManager = new RealTimeManager()

//Start a web socket server
const io = new Server(server);

//Web sockets funtionality
io.on("connection", async(socket) => {
    const products = await realTimeManager.getProducts()
    socket.emit("initialize", products)

    socket.on("deleteProduct", async (id) => {
        realTimeManager.deleteProduct(id)
        const products = await realTimeManager.getProducts()
        socket.emit("initialize", products)
    })
    
    socket.on("addProduct", async (product) => {
        realTimeManager.addProduct(product)
        const products = await realTimeManager.getProducts()
        socket.emit("initialize", products)
    })
    
    socket.on("modifyProduct", async (modifiedProduct, id) => {
        realTimeManager.modifyProducts(id, modifiedProduct)
        const products = await realTimeManager.getProducts()
        socket.emit("initialize", products)
    })
})

