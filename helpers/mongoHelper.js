'use strict';

const _ = require('lodash');
const models = require('../mongoModels/index');

exports.importData = (mongoose) => {
	const productsData = require('./../data/data.json')[0].products;
	const usersData = require('./../data/data.json')[0].users;
	console.log('import products and users data from file is running');
	productsData.map( (curProduct) => {
		models.Product.findOne({ name: curProduct.name }, function (err, product){
		  if(product) {
				console.log(`product named '${product.name}' is already present in the database`);
			} else {
				models.Product.create({ name: curProduct.name, reviews: curProduct.reviews }, function(err, newProduct) {
				  console.log(`product called '${newProduct.name}' was created`);
				});
			}
		});
	});
	usersData.map( (curUser) => {
		models.User.findOne({ firstname: curUser.firstname, lastname: curUser.lastname }, function (err, user){
		  if(user) {
				console.log(`user '${user.firstname} ${user.lastname}' is already present in the database`);
			} else {
				models.User.create( curUser, function(err, newUser) {
				  console.log(`user '${newUser.firstname} ${newUser.lastname}' was created`);
				});
			}
		});
	});
};