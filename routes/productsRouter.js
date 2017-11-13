'use strict';

const express = require('express');
const app = require('../app');
const router = express.Router();
const _ = require('lodash');
const passport = require('passport');
const checkToken = require('./../middlewares/checkToken');

app.use(express.json());

const usedData = require('./../data/data.json');
let authMiddleware = '';

module.exports = function(opts) {
	authMiddleware = (opts.authentication && opts.authentication == 'jwt') ? checkToken : passport.authenticate('bearer', { session: false });

	router.param('id', (req, res, next, id) => {
		req.product = _.find(usedData[0].products, (curProduct) => { return curProduct.id == id });
		next();
	});

	router.get('/', authMiddleware, (req, res) => {
		res.json(usedData[0].products)
	});

	router.post('/', authMiddleware, (req, res) => {
		let product = req.body;
		usedData[0].products.push(product);
		res.status(201).send(usedData[0].products);
	});

	router.get('/:id', authMiddleware, (req, res) => {
		res.json(req.product)
	});

	router.get('/:id/reviews', authMiddleware, (req, res) => {
		console.log('find product route');
		res.json(req.product.reviews)
	});

	app.use('/products', router);
}