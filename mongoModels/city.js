'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citySchema = new Schema({
	name: { type: String, required: true },
	country: { type: String, required: true },
	capital: { type: Boolean, default: false },
	location: {
		lat:  { type: Number, required: true },
		long: { type: Number, required: true }
	}
});
module.exports = mongoose.model('City', citySchema);