import BaseModel from './BaseModel'
import Attributes from './Atttributes'
export default class Image extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}