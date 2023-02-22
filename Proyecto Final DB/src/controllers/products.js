import {mongoose} from 'mongoose'

export class RealTimeManager {
    constructor (){
        this.products = []
        this.initialize()
    }

    static NextId = 0

    async initialize(){
        const uri = "mongodb://localhost:27017/productDatabase";
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopolo: true})
        try 
        {
            // Connect to the MongoDB cluster
            await client.connect();
            // Make the appropriate DB calls
            await listDatabases(client);
            console.log("Se ha inicializado la conexion con la base de datos")
        }
        catch (e) 
        {
            console.error(e);
        }
        finally 
        {
           await client.close();
        }

    }

    async listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    getProducts(){
        const pereda = [
            {
                id: 1,
                title: "Tostitos",
                description: "Sabritas enchilosas",
                price: 15,
                code: "001" 
            },
            {
                id: 2,
                title: "Tostitos",
                description: "Sabritas enchilosas",
                price: 15,
                code: "002"
            },
            {
                id: 3,
                title: "Tostitos",
                description: "Sabritas enchilosas",
                price: 15,
                code: "003"
            },
            {
                id: 4,
                title: "Tostitos",
                description: "Sabritas enchilosas",
                price: 15,
                code: "004" 
            },
            {
                id: 5,
                title: "Tostitos",
                description: "Sabritas enchilosas",
                price: 15,
                code: "005"
            }
        ]
        return pereda
    }

    async addProduct(product){
      console.log(product.title)  
      console.log(product.description)  
      console.log(product.price)  
      console.log(product.code)  
    }

    async modifyProducts(id, product){ 
        console.log(id)
        console.log(product)
    }

    async deleteProduct(id){
        console.log(id)
    }
}
