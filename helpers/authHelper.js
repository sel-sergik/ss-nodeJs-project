'use strict';

const models = require('../models/index');

exports.initJwtAuth = (app, router) => {
	const jwt = require('jsonwebtoken');

	router.post('/', (req, res) => {
		const user = req.body;

		models.User.findOne({ where: { firstname: user.firstname} }).then(curUser => {

			if (curUser === undefined || curUser.password !== user.password) {
				res.status(404).send({ code: 404,  message: 'Not Found', data: "You entered an invalid login/password. Please try again." });
			} else {
				let payload = { "user_id": curUser.accountId, "isActive": curUser.isActive };
				let token = jwt.sign(payload, 'secretWord', { expiresIn: 30 });
				res.send({code: 200, message: "OK", data: { user: { email: curUser.email, username: curUser.firstname } }, token: token});
			}
		});
	});

	app.use('/auth', router);
};

exports.initPassportAuth = (app, router) => {
	const passport = require('passport');
	const LocalStrategy = require('passport-local');
	const BearerStrategy = require('passport-http-bearer').Strategy;
	const FacebookStrategy = require('passport-facebook').Strategy;
	const TwitterStrategy = require('passport-twitter').Strategy;
	const GoogleOAuth2Strategy = require('passport-google-auth').Strategy;

	passport.use(new LocalStrategy({
		usernameField: 'firstname',
		passwordField: 'password',
		session: false
	}, function (username, password, done) {
		models.User.findOne({ where: { firstname: username} }).then(curUser => {
			if (curUser === undefined || curUser === null || curUser.password !== password) {
				done(null, false, 'Bad username/password combination');
			} else {
				done(null, curUser);
			}
		});
	}));

	passport.use(new BearerStrategy(
		function (token, done) {
			models.User.findOne({ where: { token: token } }).then(result => {
				if (result === undefined || result === null) {
					done(null, false);
				} else {
					done(null, result, { scope: 'all' })
				}
			});
		}
	));

	passport.use(new FacebookStrategy({
	    clientID: 'FACEBOOK_APP_ID',
	    clientSecret: 'FACEBOOK_APP_SECRET',
	    callbackURL: "http://localhost:8080/auth/facebook/callback"
	  },
	  (accessToken, refreshToken, profile, cb) => {
	    User.findOrCreate({ facebookId: profile.id }, (err, user) => {
	      return cb(err, user);
	    });
	  }
	));

	passport.use(new TwitterStrategy({
	    consumerKey: 'TWITTER_CONSUMER_KEY',
	    consumerSecret: 'TWITTER_CONSUMER_SECRET',
	    callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
	  },
	  (token, tokenSecret, profile, cb) => {
	    User.findOrCreate({ twitterId: profile.id }, (err, user) => {
	      return cb(err, user);
	    });
	  }
	));

	passport.use(new GoogleOAuth2Strategy({
	    clientId: '123-456-789',
	    clientSecret: 'shhh-its-a-secret',
	    callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
	  },
	  (accessToken, refreshToken, profile, cb) => {
	    User.findOrCreate({ googleId: profile.id }, (err, user) => {
	      cb(err, user);
	    });
	  }
	));

	app.use(passport.initialize());

	router.post('/', passport.authenticate('local', { session: false }), (req, res) => {
		models.User.findOne({ where: { accountId: req.user.accountId } }).then(curToken => res.json(curToken));
	});

	router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
    console.log('logined as facebook user');
    res.redirect('/');
  });

  router.get('/twitter', passport.authenticate('twitter'), (req, res) => {
  	console.log('logined as twitter user');
    res.redirect('/');
  });

  router.get('/google', passport.authenticate('google'), (req, res) => {
    console.log('logined as google user');
    res.redirect('/');
  });

	app.use('/auth', router);
};