const shopModel = require('../models/shop');
const express = require('express');
const router = express.Router()

//Generic error handler
function errorHandler(res, userMessage, message, code) {
    console.log("ERROR: " + message);
    res.status(code || 500).json({"error": userMessage});
}

//Route for /api/v1/shops
router.route('/')

    //http POST to create a new shop from JSON
    .post((req, res) => {
        let newShop = new shopModel.Shop(req.body);
        shopModel.createShop(newShop, (err, doc) => {
            if (err) {
                errorHandler(res, err.message, "Failed to create new Shop.", 422);
            } else {
                res.status(201).json(doc);
            }
        });
    })

    //http GET to retrieve shops based on URL parameters
    .get((req, res) => {
        
    });

//Route for /api/v1/shops/:id
router.route('/:id')

    //http GET to retrieve shop details by id
    .get((req, res) => {
        
})

    //http PUT to update shop by id
    .put((req, res) => {
    
})

    //http DELETE to delete post by id
    .delete((req, res) => {
    
});

module.exports = router;