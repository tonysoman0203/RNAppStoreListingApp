import BaseModel from './BaseModel'
import Attributes from './Atttributes'
export default class Category extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}