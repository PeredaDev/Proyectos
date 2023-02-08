import {promises as fs} from 'fs'

export class FileManager{
    constructor(path){
        this.Path = path
    }

    async getElementsFromFile(){
        let elements = await fs.readFile(this.Path, 'utf-8')
        return JSON.parse(elements)
    }

    async writeElementsToFile(elements){
        await fs.writeFile(this.Path, JSON.stringify(elements))
    }
}