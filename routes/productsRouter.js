'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const models = require('../mongoModels/index');
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');

app.use(express.json());

let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.param('id', (req, res, next, id) => {
		models.Product.findById(id, (err, product) => {
			req.product = product;
			next();
		});
	});

	router.get('/', authMiddleware, (req, res) => {
		models.Product.find({}, (err, products) => {
			res.json(products);
		});
	});

	router.post('/', authMiddleware, (req, res) => {
		let product = req.body;
		models.Product.create({ name: product.name }, (err, newProduct) => { res.status(201).send(newProduct); });
	});

	router.get('/:id', authMiddleware, (req, res) => {
		res.json(req.product)
	});

	router.delete('/:id', authMiddleware, (req, res) => {
		models.Product.findByIdAndRemove(req.product._id, (err, product) => {
				res.status(200).send({ message: "product successfully deleted", id: product._id });
		});
	});

	router.get('/:id/reviews', authMiddleware, (req, res) => {
		res.json(req.product.reviews);
	});

	app.use('/products', router);
}