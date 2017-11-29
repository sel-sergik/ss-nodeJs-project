'use strict';

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const CityModel = require('../mongoModels/city');
const url = 'mongodb://localhost:27017/nodejs';
require('http')
	.createServer()
	.on('request', (req,res) => {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		// native mongo driver
		/*MongoClient.connect(url, function(err, db) {
			if (!err) {
				console.log("Connected correctly to server");
			}
			db.collection('cities').find({}).toArray(function(err, cities) {
		    console.log("Found the following cities");
				let randomCity = cities[Math.floor(Math.random()*(cities.length-1))];
		    console.log(randomCity);
				res.end(Buffer.from(JSON.stringify(randomCity)));
				db.close();
		  });

		});*/

		// mongoose
		mongoose.connect(url);

		CityModel.find({}, function (err, cities) {
		  console.log("Found the following cities");
			let randomCity = cities[Math.floor(Math.random()*(cities.length-1))];
	    console.log(randomCity);
			res.end(Buffer.from(JSON.stringify(randomCity)));
		});
	})
	.listen(3000);


