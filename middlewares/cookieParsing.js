'use strict';

const app = require('../app');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/', (req, res, next) => {
	if(!req.parsedCookies) {
		res.cookie('user', 'Siarhei Seliukou');
	}
	next();
});
app.use('/', (req, res, next) => {
	req.parsedCookies = req.cookies;
	console.log('Parsed cookie:', req.parsedCookies);
	next();
});
