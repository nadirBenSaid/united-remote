//Import JWT, a JSON Web Token implementation
const jwt = require('jsonwebtoken');

//Import and config bcript for password management
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Import file system and read private and public keys
const fs = require('fs');
const privateKey = fs.readFileSync('./config/jwtRS256.key');
const publicKey = fs.readFileSync('./config/jwtRS256.key.pub');

//Import User model and Express router
const userModel = require('../models/user');
const express = require('express');
const router = express.Router();

//Generic error handler
function errorHandler(res, userMessage, message, code) {
    console.log("ERROR: " + message);
    res.status(code || 500).json({"error": userMessage});
}

//http POST for creating new users (signup)
router.route('/').post((req, res)=>{
    let user = req.body;

    //Define empty array attributes for liked and disliked shops
    user.likes = [];
    user.dislikes = [];

    //Hash and salt password
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if(!err){

            //Save hash as password attribute
            user.password = hash;

            //Create user from user Model
            let newUser = new userModel.User(user);

            //Persist user in DB
            userModel.createUser(newUser, (err, doc) => {
                if (err) {
                    errorHandler(res, err.message, "Failed to create new User.", 422);
                } else {
                    res.status(201).json(doc);
                }
            });
        }else{
            errorHandler(res, "there was a server internal error", "hashing issue", 500);
        }
    });
});

//http POST for retrieving an access token for Users (login)
router.route('/login').post((req, res)=>{

    //Retrieve User password from database
    userModel.retrieveUser(req.body.email, (dbErr, doc)=>{
        doc = doc[0];
        if(!dbErr && doc.password){

            //Compare hashed password with user provided password 
            bcrypt.compare(req.body.password, doc.password, (hashErr, result) => {
                if(!hashErr && result){

                    //Generate user access token
                    jwt.sign({_id: doc._id}, privateKey, {algorithm: 'RS256'}, (tokenErr, token)=>{
                        if(!tokenErr){

                            //Return User access token that will be used to access 
                            //User limited endpoints
                            res.status(200).json({
                                token, 
                                _id: doc._id
                            });
                        }else{
                            errorHandler(res, 'Internal server error', tokenErr, 500);
                        }
                    });
                }else{
                    errorHandler(res, 'Email or password are wrong', hashErr, 404);
                }
            });
        }else{
            console.log(doc)
            errorHandler(res, 'Email or password are wrong', dbErr, 404);
        }
    });
});

module.exports = router;