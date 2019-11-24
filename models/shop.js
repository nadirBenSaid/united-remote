//Import events module
const EventEmitter = require('events');

//Import mongoose driver and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Shop Schema object
const shopSchema = new Schema(
	{
		picture: { type: String, required: [true, 'Why no picture link?'] },
		name: { type: String, required: [true, 'Why no name?'] },
		email: { type: String, required: [true, 'Why no email?'] },
		city: { type: String, required: [true, 'Why no city?'] },
		location: {
			type: { type: String, required: [true, 'Why no type?'] },
			coordinates: {
				type: [{ type: Number }],
				validate: [arr => arr.length == 2, 'must be two coordinates'],
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
		fields = params.fields.split(',').join(' ');
	}

	//Geo Sort by location and filter by distance
	if (params.location) {
		let center = params.location.split(',').map(ele => +ele);
		criteria.location = {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: center,
				},
			},
		};
		if (params.distance)
			criteria.location.$near.$maxDistance = +params.distance;
	}

	//Check pagination parameters
	if (params.limit && params.skip) {
		pagination.skip = +params.skip;
		pagination.limit = +params.limit;
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
