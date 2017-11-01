const express = require('express');
const app = require('../app');
const router = express.Router();
var _ = require('lodash');
const fs = require('fs');

app.use(express.json());

const usedData = JSON.parse(fs.readFileSync('./data/data.json').toString())[0];

router.param('id', (req, res, next, id) => {
	req.product = _.find(usedData.products, (curProduct) => { return curProduct.id == id });
	next();
});

router.get('/', (req, res) => {
	res.json(usedData.products)
});

router.post('/', (req, res) => {
	let product = req.body;
	usedData.products.push(product);
	res.status(201).send(usedData.products);
});

router.get('/:id', (req, res) => {
	res.json(req.product)
});

router.get('/:id/reviews', (req, res) => {
	console.log('find product route');
	res.json(req.product.reviews)
});

app.use('/products', router);