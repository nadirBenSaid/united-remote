//Import express and other dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Import Shop and User router
const shopRouter = require('./routers/shop-router');
const userRouter = require('./routers/user-router');

//Import mongoose driver, database configuration
const mongoose = require('mongoose');
const database = require('./config/database');

//Sets to avoid deprication Warnings in Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Establish connection to Atlas MongoDB
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

//Set public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Implement Shop Router
app.use('/api/v1/shops', shopRouter);

//Implement User Router
app.use('/api/v1/users', userRouter);

//Listen to port set on .env file
app.listen(ENV.PORT, () => {
    console.log(`Starting the server at port ${ENV.PORT}.`);
});