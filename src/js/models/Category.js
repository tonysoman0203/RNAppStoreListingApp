import BaseModel from './BaseModel'
import Attributes from './Attributes'
export default class Category extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}