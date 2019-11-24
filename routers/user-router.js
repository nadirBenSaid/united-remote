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

//Middleware for token verification
function verifyToken(req, res, next){

    //Token should be in the Authorization header
    // Authorization: Bearer <access_token>
    const header = req.headers['authorization'];

    if(header){

        //get access token from header
        const token = header.split(' ')[1];

        //set access token in req
        req.token = token;

        //move to next handler
        next();
    }else{

        //unauthorized access error
        errorHandler(res, "unauthorized access", "No Authorization header", 403);
    }
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
                            res.status(200).json(token);
                        }else{

                            //Token generation error
                            errorHandler(res, 'Internal server error', tokenErr, 500);
                        }
                    });
                }else{

                    //Wrong password error
                    errorHandler(res, 'Email or password are wrong', hashErr, 404);
                }
            });
        }else{

            //unexistent email error
            errorHandler(res, 'Email or password are wrong', dbErr, 404);
        }
    });
});

//http GET to retrieve a user's liked and disliked shops
router.route('/shops').get(verifyToken, (req, res)=>{

    //verify token and return payload
    jwt.verify(req.token, publicKey, {algorithms: ['RS256']},(tokenErr, payload)=>{
        if(!tokenErr){

            //retrieve User by Id from DB
            userModel.retrieveUserById(payload._id, (err, doc)=>{
                if(!err){
                    if(doc){

                        //return a payload containing likes and dislikes
                        res.status(200).json({
                            likes: doc.likes,
                            dislikes: doc.dislikes
                        });
                    }else{

                        //error for doc not found
                        res.sendStatus(404);
                    }
                }else{
                    
                    //DB error
                    errorHandler(res, "internal server error", err, 500);
                }
            });
        }else{

            //unauthorized access
            errorHandler(res, "Unauthorized request", tokenErr, 403);
        }
    });
});

//http routes for liking/disliking a shop and removing a shop from liked shops
router.route('/shops/:shopId')

    //Insert shop in likes or dislikes based on payload
    .put(verifyToken, (req, res)=>{
        
        //verify token and return payload
        jwt.verify(req.token, publicKey, {algorithms: ['RS256']},(tokenErr, payload)=>{
            if(!tokenErr){

                //like or dislike Shop
                userModel.likeOrDislikeShop(payload._id, req, (err, doc)=>{
                    if(!err){
                        if(doc){

                            //return a payload containing updated user
                            res.status(200).json(doc);
                        }else{

                            //error for doc not found
                            res.sendStatus(404);
                        }
                    }else{
                        
                        //DB error
                        errorHandler(res, "internal server error", err, 500);
                    }
                });
            }else{

                //unauthorized access
                errorHandler(res, "Unauthorized request", tokenErr, 403);
            }
        });
    })

module.exports = router;