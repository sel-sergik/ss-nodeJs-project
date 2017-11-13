'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');

const usedData = require('./../data/data.json');
let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.get('/', authMiddleware, (req, res) => {
		res.json(usedData.users)
	});

	app.use('/users', router);
}