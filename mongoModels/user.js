'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, validate: {
		validator: function(email) {
			return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
		},
		message: '{VALUE} is not a valid email!'},
	},
	password: { type: String, default: "1234" },
	isActive: { type: Boolean, default: false },
	accountId: { type: String, unique: true },
	token: { type: String, unique: true }
});
module.exports = mongoose.model('User', userSchema);