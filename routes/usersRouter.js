'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');
const models = require('../mongoModels/index');

let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.param('id', (req, res, next, id) => {
		models.User.findById(id, (err, user) => {
			req.user = user;
			next();
		});
	});

	router.get('/', authMiddleware, (req, res) => {
		models.User.find({}, (err, users) => {
			res.json(users);
		});
	});

	router.delete('/:id', authMiddleware, (req, res) => {
		models.User.findByIdAndRemove(req.user._id, (err, user) => {
				res.status(200).send({ message: "user successfully deleted", id: user._id });
		});
	});

	app.use('/users', router);
}