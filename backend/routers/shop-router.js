const shopModel = require('../models/shop');
const express = require('express');
const router = express.Router();

//Generic error handler
function errorHandler(res, userMessage, message, code) {
	console.log('ERROR: ' + message);
	res.status(code || 500).json({ error: userMessage });
}

//Route for /api/v1/shops
router
	.route('/')

	//http POST to create a new shop from JSON
	.post((req, res) => {
		let newShop = new shopModel.Shop(req.body);
		shopModel.createShop(newShop, (err, doc) => {
			if (err) {
				errorHandler(
					res,
					err.message,
					'Failed to create new Shop.',
					200
				);
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
				errorHandler(
					res,
					err.message,
					'Failed to retrieve shops.',
					200
				);
			} else {
				res.status(200).json(resp);
			}
		});
	});

//Route for /api/v1/shops/:id
router
	.route('/:id')

	//http GET to retrieve shop details by id
	.get((req, res) => {
		shopModel.retrieveShop(req.params.id, (err, resp) => {
			if (err || !resp) {
				errorHandler(res, 'Shop not found.', err, 404);
			} else {
				res.status(200).json(resp);
			}
		});
	})

	//http PUT to update shop by id
	.put((req, res) => {
		_id = req.params.id;
		shopModel.updateShop(_id, req.body, (err, doc) => {
			if (err) {
				errorHandler(res, 'Shop not found.', err, 404);
			} else if (doc.n === 0) {
				errorHandler(res, 'Bad request', err, 400);
			} else {
				res.status(200).json(_id);
			}
		});
	})

	//http DELETE to delete shop by id
	.delete((req, res) => {
		_id = req.params.id;
		shopModel.deleteShop(_id, (err, doc) => {
			if (err || doc.n === 0) {
				errorHandler(res, 'Shop not found.', err, 404);
			} else {
				res.status(200).json(_id);
			}
		});
	});

module.exports = router;
