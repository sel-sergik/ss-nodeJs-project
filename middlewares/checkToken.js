'use strict';
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
	let token = req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, 'secretWord', function(err, decoded) {
			if (err) {
				res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				next();
			}
		});
	} else {
		res.status(403).send({ success: false, message: 'No token provided.' });
	}
}


module.exports = checkToken;