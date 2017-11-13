'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const authHelper = require('./../helpers/authHelper');

app.use(express.json());

const usedData = require('./../data/data.json');

module.exports = function(opts) {
	if (opts.authentication && opts.authentication == 'jwt') {
		authHelper.initJwtAuth(app, router, usedData);
	} else {
		authHelper.initPassportAuth(app, router, usedData);
	}
}