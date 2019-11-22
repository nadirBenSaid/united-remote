//Import express and other dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// import mongoose driver, database configuration
const mongoose = require('mongoose');
const database = require('./config/database');

// sets to avoid deprication Warnings in Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// establish connection to Atlas MongoDB
mongoose.connect(database.connectionString, (err) => {
    if (!err) {
        console.log('MongoDB Atlas Connection Succeeded.');
    } else {
        console.log('Error in DB connection: ' + err);
    }
});

//Import and configure environment variables from .env file
require('dotenv').config();
const ENV = process.env;

//Initialize our app variable
const app = express();

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Listen to port set on .env file
app.listen(ENV.PORT, () => {
    console.log(`Starting the server at port ${ENV.PORT}.`);
});