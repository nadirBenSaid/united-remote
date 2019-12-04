//Import events module
const EventEmitter = require('events');

//Import mongoose driver and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Shop Schema object
const shopSchema = new Schema(
	{
		picture: { type: String, required: [true, ' Picture required'] },
		name: { type: String, required: [true, ' Name required'] },
		email: { type: String, required: [true, ' Email required'] },
		city: { type: String, required: [true, ' City required'] },
		location: {
			type: { type: String, required: [true, ' Location required'] },
			coordinates: {
				type: [{ type: Number }],
				validate: [arr => arr.length == 2, ' Must be two coordinates'],
			},
		},
	},
	{ versionKey: false }
);

//Create Shop Model
const Shop = (module.exports.Shop = mongoose.model('Shop', shopSchema));

//Insert a shop in MongoDB atlas using mongoose
exports.createShop = (newShop, callback) => {
	newShop.save(callback);
};

//Latiude Regex:
const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/;

//Longitude Regex:
const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/;

//Functions that validates int parameters
// this useful in case a user sends a string or
// a long numerical string as a parameter
// we wouldn't want to cast into a Number and take the
// risk hence the bitwise operators

function min(a, b) {
	return b ^ ((a ^ b) & -(a < b));
}

function max(a, b) {
	return a ^ ((a ^ b) & -(a < b));
}

//Select shops from MongoDB atlas based on parameters using mongoose
exports.retrieveShops = (params, callback) => {
	//Initiate variables
	let criteria = {};
	let pagination = {};
	let response = {};
	let fields = 'picture name city';

	//Create event emitter for when data is ready to be served
	const resEvent = new EventEmitter();

	//Query by shop name
	if (params.name) criteria.name = { $regex: params.name, $options: 'i' };

	//Filter by city
	if (params.city) criteria.city = { $regex: params.city, $options: 'i' };

	//Define desired document attributes
	if (params.fields) {
		fields = params.fields.replace(',', ' ');
	}

	//if location not enabled by client, defaults to center of Rabat

	let center = [-6.8498, 33.9716];

	if (params.location) {
		// separate coordinates and limit length
		center = params.location
			.split(',')
			.map(ele => (ele.length > 8 ? ele.substring(0, 8) : ele));

		if (lngRegex.test(center[0]) && latRegex.test(center[1])) {
			// set location if lng and lat match regex
			center = center.map(ele => +ele);
		} else {
			//if location params are incorrect
			callback({ message: 'wrong location params' }, {});
			return;
		}
	}

	criteria.location = {
		$near: {
			$geometry: {
				type: 'Point',
				coordinates: center,
			},
		},
	};

	// if no circle radius defined, or more than 10 km
	// defaults to a 10 km radius
	criteria.location.$near.$maxDistance = min(params.distance, 10000);

	//Check pagination parameters
	if (params.limit && params.skip) {
		pagination.skip = max(params.skip, 0);
		pagination.limit = min(params.limit, 160);
	}

	//Register listener on Shop.count and call callback if Shop.find is ready
	resEvent.on('count', count => {
		response.totalCount = count;
		if (response.hasOwnProperty('docs')) {
			callback(response.err, response);
		}
	});

	//Register listener on Shop.find and call callback if Shop.count is ready
	resEvent.on('docs', data => {
		response.error = data.error;
		response.docs = data.docs;
		if (response.hasOwnProperty('totalCount')) {
			callback(response.error, response);
		}
	});

	//Count total docs that match the criteria (for sake of efficient pagination):
	//
	// the count() function prints a deprecation warning. usually using countDocuments()
	// would be a better alternative but in this case it isn't since countDocuments() does not
	// support the $near operator. and estimatedCountDocuments() doesn't take a filter.
	//
	// there is a workaround that doesn't involve $near but in that case the results, while
	// within a geographical circle, are not ordered by distance from nearest.
	//
	Shop.count(criteria).then(res => {
		resEvent.emit('count', res);
	});

	//Find docs that match criteria and take a chunk (limit & offset)
	Shop.find(criteria, fields, pagination, (err, res) => {
		resEvent.emit('docs', { docs: res, error: err });
	});
};

//Select shop's details from mongodb by id
exports.retrieveShop = (_id, callback) => {
	Shop.findById({ _id }, callback);
};

//Select shop's details from mongodb by id
exports.updateShop = (_id, shopData, callback) => {
	Shop.updateOne({ _id }, shopData, callback);
};

//Select shop's details from mongodb by id
exports.deleteShop = (_id, callback) => {
	Shop.deleteOne({ _id }, callback);
};

//Get shops from array of Ids
exports.retrieveShopsByIds = (ids, callback) => {
	Shop.find({ _id: { $in: ids } }, callback);
};
