import BaseModel from './BaseModel'
import Attributes from './Attributes'
export default class Id extends BaseModel {
	constructor() {
		super()
		this.attributes = new Attributes()
	}
}
