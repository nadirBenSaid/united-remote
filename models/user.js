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
        {
            _id: {type: ObjectId, ref: 'Shop'}, 
            dislikedAt: { type : Date, default: Date.now }
        }
    ]
},{versionKey: false});

//Create User Model
const User = module.exports.User = mongoose.model('User', userSchema);

//Insert a user in MongoDB atlas using mongoose
exports.createUser = (newUser, callback) => {
    newUser.save(callback);
}

//Retrieve user from MongoDB atlas
exports.retrieveUser = (email, callback) => {
    User.find({email}, 'password', {limit: 1}, callback);
}

//Retrieve user by id
exports.retrieveUserById = (_id, callback)=>{
    User.findById({_id}, callback);
}

//Move shop betwen like/dislike/neutral states based on previous
// shop state and a provided argument (up) that describes how
// the shop should transition:
//
// if shop in dislikes and up is true then shop goes up to neutral
//
// if shop in neutral and up is true then shop goes up to like
//
// if shop in like and up is false shop goes down to neutral
//
// etc...
//
exports.likeOrDislikeShop = (_id, req, callback) =>{

    //Detects whether shop is within dislikes
    function dislikesInclude(user){
        let test = false;

        //Sets test to true if shop in dislikes
        user.dislikes.map(ele=>{
            if(ele._id == req.params.shopId){
                test = true
            }
        })
        return test;
    }

    this.retrieveUserById(_id, (err, user)=> {
        if(!err){

            //insert into likes
            if(!dislikesInclude(user) && !user.likes.includes(req.params.shopId) && req.body.up){
                user.likes.push(req.params.shopId);
            }

            //insert into dislikes
            if(!dislikesInclude(user) && !user.likes.includes(req.params.shopId) && !req.body.up){
                user.dislikes.push({
                    _id: req.params.shopId
                });
            }

            //remove from likes
            if(user.likes.includes(req.params.shopId) && !req.body.up){
                user.likes = user.likes.filter(ele=> ele != req.params.shopId);
            }

            //remove from dislikes
            if(dislikesInclude(user) && req.body.up){
                user.dislikes = user.dislikes.filter(ele=> ele._id != req.params.shopId);
            }

            user.save();
        }
        callback(err, user);
    });
}