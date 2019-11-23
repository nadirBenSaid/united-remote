//Import and config bcript for password management
const bcrypt = require('bcrypt');
const saltRounds = 10;

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



module.exports = router;