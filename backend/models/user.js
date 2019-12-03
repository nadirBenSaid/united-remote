//Import mongoose driver, Schema and shopSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const shopModel = require('./shop');
const timestampModel = require('./timestamp');

//Create User Schema object
const userSchema = new Schema(
	{
		name: { type: String, required: [true, ' Name required'] },
		email: {
			type: String,
			unique: true,
			required: [true, ' Email required'],
		},
		password: { type: String, required: [true, ' Password required'] },
		likes: [{ type: ObjectId, ref: 'Shop' }],
		dislikes: [
			{
				_id: { type: ObjectId, ref: 'Shop' },
				_time: { type: ObjectId, ref: 'Timestamp' },
			},
		],
	},
	{ versionKey: false }
);

//Create User Model
const User = (module.exports.User = mongoose.model('User', userSchema));

//Insert a user in MongoDB atlas using mongoose
exports.createUser = (newUser, callback) => {
	newUser.save(callback);
};

//Retrieve user from MongoDB atlas
exports.retrieveUser = (email, callback) => {
	User.find({ email }, 'password', { limit: 1 }, callback);
};

//Retrieve user by id
const retrieveUserById = (exports.retrieveUserById = (_id, callback) => {
	User.findById({ _id }, callback);
});

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
exports.likeOrDislikeShop = (_id, req, callback) => {
	//verify whether shop exists in DB
	shopModel.retrieveShop(req.params.shopId, (err, doc) => {
		if (err) {
			console.log(err);
		} else {
			if (!doc) {
				callback(err, doc);
			} else {
				updateUserPreferences(_id, req, callback);
			}
		}
	});
};

/*
 **
 **		Separate Functions to better encapsulate the code's logic
 **
 */

//Detects whether shop is within dislikes
function dislikesInclude(user, req) {
	let test = false;

	//Sets test to true if shop in dislikes
	user.dislikes.map(ele => {
		if (ele._id == req.params.shopId) {
			test = true;
		}
	});
	return test;
}

//Update Likes/Dislikes
function updateUserPreferences(_id, req, callback) {
	//retrieve user
	retrieveUserById(_id, (err, user) => {
		if (
			!err &&
			!dislikesInclude(user, req) &&
			!user.likes.includes(req.params.shopId)
		) {
			if (req.body.up) {
				//insert into likes if not already in likes/dislikes
				user.likes.push(req.params.shopId);
			} else {
				//insert into dislikes if not already in likes/dislikes
				let timestamp = new timestampModel.Timestamp();
				timestamp.save();
				user.dislikes.push({
					_id: req.params.shopId,
					_time: timestamp._id,
				});
			}
		} else if (
			!err &&
			user.likes.includes(req.params.shopId) &&
			!req.body.up
		) {
			//remove from likes if already in likes
			user.likes = user.likes.filter(ele => ele != req.params.shopId);
		}
		// persist changes
		user.save();
		callback(err, user);
	});
}
