/*
 **
 **     IMPORTS AND CONFIGS SECTION
 **
 */

//Import JWT, a JSON Web Token implementation
const jwt = require('jsonwebtoken');

//Import and configure environment variables from .env file
require('dotenv').config();
const ENV = process.env;

//Import and config bcript for password hashing and comparing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Import file system and read private and public keys
const fs = require('fs');
const privateKey = fs.readFileSync(ENV.PRIVATE_KEY);
const publicKey = fs.readFileSync(ENV.PUBLIC_KEY);

//Import User model and Express router
const userModel = require('../models/user');
const express = require('express');
const router = express.Router();

/*
 **
 **     ROUTES SECTION
 **
 */

//http POST for creating new users (signup)
router.route('/').post((req, res) => {
	//check generic functions section below for more details
	signupUser(req, res);
});

//http POST for retrieving an access token for Users (login)
router.route('/login').post((req, res) => {
	//check generic functions section below for more details
	loginUser(req, res);
});

//http GET to retrieve a user's shops
router.route('/shops').get(getToken, (req, res) => {
	//more details on section below
	verifyToken(req, res, getUserShops);
});

//http routes for liking/disliking a shop and removing a shop from liked shops
router.route('/shops/:shopId').put(getToken, (req, res) => {
	//more details on section below
	verifyToken(req, res, updateShopPreference);
});

/*
 **
 **     GENERIC FUNCTIONS SECTION
 **
 */

//Generic error handler
function errorHandler(res, userMessage, message, code) {
	console.log('ERROR: ' + message);
	res.status(code || 500).json({ error: userMessage });
}

//function used to signup new users
function signupUser(req, res) {
	let user = req.body;
	//Define empty array attributes for liked and disliked shops
	user.likes = [];
	user.dislikes = [];
	//Hash and salt password
	hashAndSalt(user, res);
}

//function to hash and salt user using bcrypt
function hashAndSalt(user, res) {
	bcrypt.hash(user.password, saltRounds, (err, hash) => {
		if (!err) {
			//Save hash as password attribute
			user.password = hash;
			//Create user from user Model
			let newUser = new userModel.User(user);
			//persist new User in DB
			persistUser(newUser, res);
		} else {
			errorHandler(
				res,
				'there was a server internal error',
				'hashing issue',
				500
			);
		}
	});
}

//Function to persist newly created user
function persistUser(newUser, res) {
	//Model function to persist user in DB
	userModel.createUser(newUser, (err, doc) => {
		if (!err) {
			res.status(201).json(doc);
		} else {
			errorHandler(res, err.message, 'Failed to create new User.', 422);
		}
	});
}

//Attempt to login user if password is verified
function loginUser(req, res) {
	//Retrieve User password from database
	userModel.retrieveUser(req.body.email, (dbErr, doc) => {
		doc = doc[0];
		if (!dbErr && doc) {
			verifyPassword(req, res, doc);
		} else {
			//unexistent email error
			errorHandler(
				res,
				'Email or password are wrong',
				'email unfound',
				404
			);
		}
	});
}

//Password verification
function verifyPassword(req, res, doc) {
	//Compare hashed password with user provided password
	bcrypt.compare(req.body.password, doc.password, (hashErr, result) => {
		if (!hashErr && result) {
			generateToken(res, doc);
		} else {
			//Wrong password error
			errorHandler(res, 'Email or password are wrong', hashErr, 404);
		}
	});
}

//Generating a token for verified user to use in future requests
function generateToken(res, doc) {
	//Generate user access token
	jwt.sign(
		{ _id: doc._id },
		privateKey,
		{ algorithm: 'RS256' },
		(tokenErr, token) => {
			if (!tokenErr) {
				//Return User access token that will be used to access
				//User limited endpoints
				res.status(200).json(token);
			} else {
				//Token generation error
				errorHandler(res, 'Internal server error', tokenErr, 500);
			}
		}
	);
}

//Middleware for token retrieval from Authorization Header
function getToken(req, res, next) {
	//Token should be in the Authorization header
	// Authorization: Bearer <access_token>
	const header = req.headers['authorization'];

	if (header) {
		//get access token from header
		const token = header.split(' ')[1];

		//set access token in req
		req.token = token;

		//move to next handler
		next();
	} else {
		//unauthorized access error
		errorHandler(
			res,
			'unauthorized access',
			'No Authorization header',
			403
		);
	}
}

//Uses JWT to verify User Token
function verifyToken(req, res, callback) {
	//verify token and return payload
	jwt.verify(
		req.token,
		publicKey,
		{ algorithms: ['RS256'] },
		(tokenErr, payload) => {
			if (!tokenErr) {
				callback(payload, req, res);
			} else {
				//unauthorized access
				errorHandler(res, 'Unauthorized request', tokenErr, 403);
			}
		}
	);
}

//Retrieve user's shops
function getUserShops(payload, req, res) {
	//retrieve User by Id from DB
	userModel.retrieveUserById(payload._id, (err, doc) => {
		if (!err) {
			if (doc) {
				//return a payload containing likes and dislikes
				res.status(200).json({
					likes: doc.likes,
					dislikes: doc.dislikes,
				});
			} else {
				//error for doc not found
				res.sendStatus(404);
			}
		} else {
			//DB error
			errorHandler(res, 'internal server error', err, 500);
		}
	});
}

//Update user's likes and dislikes
function updateShopPreference(payload, req, res) {
	//like or dislike Shop
	userModel.likeOrDislikeShop(payload._id, req, (err, doc) => {
		if (!err) {
			if (doc) {
				//return a payload containing updated user
				res.status(200).json(doc);
			} else {
				//error for doc not found
				res.sendStatus(404);
			}
		} else {
			//DB error
			errorHandler(res, 'internal server error', err, 500);
		}
	});
}

/*
 **
 **      EXPORTS SECTION
 **
 */

module.exports = router;
