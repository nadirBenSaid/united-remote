//Import events module 
const EventEmitter = require('events');

//Import mongoose driver and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Shop Schema object
const shopSchema = new Schema({
    picture : {type: String, required: [true, 'Why no picture link?']},
    name : {type: String, required: [true, 'Why no name?']},
    email : {type: String, required: [true, 'Why no email?']},
    city : {type: String, required: [true, 'Why no city?']},
    location : {
        type : {type: String, required: [true, 'Why no type?']},
        coordinates : {type: [{type: Number}], validate: [(arr)=> arr.length == 2 , 'must be two coordinates']}
    },
},{versionKey: false});

//Create Shop Model
const Shop = module.exports.Shop = mongoose.model('Shop', shopSchema);

//Insert a shop in MongoDB atlas using mongoose
exports.createShop = (newShop, callback)=>{
    newShop.save(callback);
}
