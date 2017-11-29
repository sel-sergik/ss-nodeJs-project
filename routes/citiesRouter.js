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
		models.City.findById(id, (err, city) => {
			if (err) {
				res.status(500).send(err);
			} else {
				req.city = city;
				next();
			}
		});
		req.city_id = id;
	});

	router.get('/', authMiddleware, (req, res) => {
		models.City.find({}, (err, cities) => {
			res.json(cities);
		});
	});

	router.post('/', authMiddleware, (req, res) => {
		let city = req.body;
		models.City.create(city, (err, newCity) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(newCity);
			}
		});
	});

	router.put('/:id', authMiddleware, (req, res) => {
		if(!req.city) {
			let city = req.body;
			city._id = req.city_id;
			models.City.create(city, (err, newCity) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(201).send(newCity);
				}
			});
		} else {
			models.City.findById(req.city._id, (err, city) => {
				if (err) {
						res.status(500).send(err);
				} else {
						city.name = req.body.name || city.name;
						city.country = req.body.country || city.country;
						city.capital = req.body.capital || city.capital;
						city.location = req.body.location || city.location;

						city.save((err, curCity) => {
								if (err) {
										res.status(500).send(err)
								}
								res.status(200).send(curCity);
						});
				}
			});
		}
	});

	router.delete('/:id', authMiddleware, (req, res) => {
		models.City.findByIdAndRemove(req.city._id, (err, city) => {
				res.status(200).send({ message: "city successfully deleted", id: city._id });
		});
	});

	app.use('/cities', router);
}