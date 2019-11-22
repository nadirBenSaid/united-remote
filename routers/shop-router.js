const shopModel = require('../models/shop');
const express = require('express');
const router = express.Router()

//Route for /api/v1/shops
router.route('/')

    //http POST to insert a shop from JSON
    .post((req, res) => {
        
})

    //http GET to retrieve shops based on URL parameters
    .get((req, res) => {
        
});

//Route for /api/v1/shops/:id
router.route('/:id')
    .get((req, res) => {
        
})
    .put((req, res) => {
    
})
    .delete((req, res) => {
    
});

module.exports = router;