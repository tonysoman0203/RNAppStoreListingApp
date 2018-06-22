import BaseModel from './BaseModel'

export default class Attributes extends BaseModel{
    constructor(){
        super()
        this.height = ''
        this.label = ''
        this.id = ''
        this.term = ''
        this.scheme = ''
        this.href = ''
        this.bundleId = ''
        this.rel = ''
        this.type = ''   
        this.amount = ''
        this.currency = ''
    }
}