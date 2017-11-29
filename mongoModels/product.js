'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
	name: { type: String, required: true },
	reviews : [{
		id: { type: Number, required: true },
    description : { type: String, required: true }
	}]
});
module.exports = mongoose.model('Product', productSchema);