'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const authHelper = require('./../helpers/authHelper');

app.use(express.json());

module.exports = function(opts) {
	if (opts.authentication && opts.authentication == 'jwt') {
		authHelper.initJwtAuth(app, router);
	} else {
		authHelper.initPassportAuth(app, router);
	}
}