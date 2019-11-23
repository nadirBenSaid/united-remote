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
        let params = req.query;
        shopModel.retrieveShops(params, (err, resp) => {
            if (err) {
                errorHandler(res, err.message, "Failed to retrieve shops.", 422);
            } else {
                if(resp.docs.length === 0){
                    res.status(404).json(resp);
                }else{
                    res.status(200).json(resp);
                }
            }
        });
    });

module.exports = router;