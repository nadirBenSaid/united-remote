//Import mongoose driver and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//Create User Schema object
const userSchema = new Schema({
    name: {type: String, required:[true, 'why no name?']},
    email : {type: String, unique: true, required:[true, 'why no email?']},
    password : {type: String, required:[true, 'why no password?']},
    likes: [{type: ObjectId, ref: 'Shop'}],
    dislikes: [
        {_shop: {type: ObjectId, ref: 'Shop'}, dislikedAt: Date}
    ]
},{versionKey: false});

//Create User Model
const User = module.exports.User = mongoose.model('User', userSchema);

//Insert a user in MongoDB atlas using mongoose
exports.createUser = (newUser, callback) => {
    newUser.save(callback);
}