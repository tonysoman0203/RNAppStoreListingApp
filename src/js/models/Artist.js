import BaseModel from './BaseModel'
import Attributes from './Atttributes'
export default class Artist extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}