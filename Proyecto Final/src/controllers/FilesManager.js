import {promises as fs} from 'fs'

export class FileManager{
    constructor(path){
        FileManager.Path = path
    }
    
    static Path

    getPath(){
        console.log(FileManager.Path)
    }

    async getProductsFromFile(){
        let products = await fs.readFile(FileManager.Path + '\\Productos.txt', 'utf-8')
        return  JSON.parse(products)
    }

    async addProductToFile(products){
        await fs.writeFile(FileManager.Path + '\\Productos.txt', JSON.stringify(products))
    }
}