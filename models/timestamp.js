/*
 **  This file represents the Timestamp Collection in the DB
 **  This collection is used to remove disliked shops from dislikes
 **  in 2 hours using TTL index (Time To Live only works on documents and
 **  not subdocuments that's why we need to create a collection for this)
 **  and MongoDB serverless Stitch functions plugged into MongoDB triggers.
 **
 **
 **  The only other alternative to accomplish this task (at least
 **  according to what I know) is the use of a Job Scheduler like Agenda
 **  to perform scans every fixed interval of time, which can lead to
 **  sloppy and inconsistent updates that don't truly represent the
 **  feature demanded.
 **
 */

//Import mongoose driver, Schema and shopSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Timestamp Schema object
const timestampSchema = new Schema(
	{
		time: { type: Date, default: Date.now },
	},
	{ versionKey: false }
);

//Create Timestamp Model
const Timestamp = (module.exports.Timestamp = mongoose.model(
	'Timestamp',
	timestampSchema
));
