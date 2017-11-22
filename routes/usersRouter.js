'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');
const models = require('../models/index');

let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.get('/', authMiddleware, (req, res) => {
		models.User.findAll({}).then( users => {
			res.json(users);
		});
	});

	app.use('/users', router);
}