'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const models = require('../models/index');
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');

app.use(express.json());

let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.param('id', (req, res, next, id) => {
		models.Product.findById(id).then( product => {
			req.product = product;
			next();
		});
	});

	router.get('/', authMiddleware, (req, res) => {
		models.Product.findAll({}).then((products) => {
			res.json(products);
		});
	});

	router.post('/', authMiddleware, (req, res) => {
		let product = req.body;
		models.Product.create({ name: product.name }).then((newProduct) => { res.status(201).send(newProduct); });
	});

	router.get('/:id', authMiddleware, (req, res) => {
		res.json(req.product)
	});

	router.get('/:id/reviews', authMiddleware, (req, res) => {
		models.Review.findAll({ where: { productId: req.product.id} }).then(reviews => { res.json(reviews) });
	});

	app.use('/products', router);
}