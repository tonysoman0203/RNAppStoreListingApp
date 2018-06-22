/* @flow */

import Artist from "./Artist";
import BaseModel from "./BaseModel";
import Category from "./Category";
import ContentType from "./ContentType";
import Id from "./Id";
import Image from "./Image";
import Link from "./Link";
import Name from "./Name";
import Price from "./Price";
import ReleaseDate from "./ReleaseDate";
import Rights from "./Rights";
import Summary from "./Summary";
import Title from "./Title";


export default class Entry extends BaseModel {
    constructor(){
        super()
        this.artist = new Artist()
        this.category = new Category()
        this.contentType = new ContentType()
        this.id = new Id()
        this.image = []
        this.link = new Link()
        this.name = new Name()
        this.releaseDate = new ReleaseDate()
        this.price = new Price()
        this.rights = new Rights()
        this.title = new Title()
        this.summary = new Summary()
        
    }
}