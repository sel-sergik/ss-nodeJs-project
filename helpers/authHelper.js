'use strict';

const _ = require('lodash');

exports.initJwtAuth = (app, router, usedData) => {
	const jwt = require('jsonwebtoken');

	router.post('/', (req, res) => {
		const user = req.body;

		let curUser = _.find(usedData[0].users, { firstname: user.firstname });

		if (curUser === undefined || curUser.password !== user.password) {
			res.status(404).send({ code: 404,  message: 'Not Found', data: "You entered an invalid login/password. Please try again." });
		} else {
			let payload = { "user_id": curUser.accountId, "isActive": curUser.isActive };
			let token = jwt.sign(payload, 'secretWord', { expiresIn: 30 });
			res.send({code: 200, message: "OK", data: { user: { email: curUser.email, username: curUser.firstname } }, token: token});
		}
	});

	app.use('/auth', router);
};

exports.initPassportAuth = (app, router, usedData) => {
	const passport = require('passport');
	const LocalStrategy = require('passport-local');
	const BearerStrategy = require('passport-http-bearer').Strategy;

	passport.use(new LocalStrategy({
		usernameField: 'firstname',
		passwordField: 'password',
		session: false
	}, function (username, password, done) {
		let curUser = _.find(usedData[0].users, { firstname: username });

		if (curUser === undefined || curUser.password !== password) {
			done(null, false, 'Bad username/password combination');
		} else {
			done(null, curUser);
		}
		}
	));

	passport.use(new BearerStrategy(
		function (token, done) {
			let result = _.find(usedData[0].users, { token: token });

			if (result === undefined) {
				done(null, false);
			} else {
				done(null, result, { scope: 'all' })
			}
		}
	));

	app.use(passport.initialize());

	router.post('/', passport.authenticate('local', { session: false }), function (req, res) {
		let { token } = _.find(usedData[0].users, { accountId: req.user.accountId });

		res.json(token);
	});

	app.use('/auth', router);
};