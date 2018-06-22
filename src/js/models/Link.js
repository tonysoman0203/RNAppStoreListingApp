import BaseModel from './BaseModel'
import Attributes from './Attributes'
export default class Link extends BaseModel {
    constructor(){
        super()
        this.attributes = new Attributes()
    }
}