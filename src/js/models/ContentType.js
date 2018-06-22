import BaseModel from './BaseModel'
import Attributes from './Atttributes'
export default class ContentType extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}