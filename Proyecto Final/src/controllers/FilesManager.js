import {promises as fs} from 'fs'

export class FileManager{
    constructor(path){
        FileManager.Path = path
    }
    
    static Path

    getPath(){
        console.log(FileManager.Path)
    }

    async getElementsFromFile(){
        let elements = await fs.readFile(FileManager.Path, 'utf-8')
        return JSON.parse(elements)
    }

    async writeElementsToFile(elements){
        await fs.writeFile(FileManager.Path, JSON.stringify(elements))
    }
}