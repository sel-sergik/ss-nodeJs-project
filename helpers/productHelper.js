'use strict';

const _ = require('lodash');
const models = require('../models/index');

exports.importData = () => {
	const productsData = require('./../data/data.json')[0].products;
	console.log('import products data from file is running');
	productsData.map( (curProduct) => {
		models.Product.findOne({ where: {name: curProduct.name} }).then(product => {
			if(product) {
				console.log(`product named '${product.name}' is already present in the database`);
			} else {
				models.Product.create({ name: curProduct.name }).then(newProduct => {
					console.log(`product called '${newProduct.name}' was created`);
					curProduct.reviews.map( (curReview) => {
						models.Review.create({ description: curReview.description, productId: newProduct.id }).then(review => {
							console.log(`was added review for product '${newProduct.name}'`);
						});
					});
				});
			}
		})
	});
};