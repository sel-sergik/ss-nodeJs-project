'use strict';

const parseArg = require('minimist');
const app = require('./app');
const Pg = require('pg').Client;
const Sequelize = require('sequelize');
const conString = 'postgres://postgres:admin@localhost:5432/nodejs';
const sequelize = new Sequelize(conString);
const productHelper = require('./helpers/productHelper');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));

//require('./middlewares/cookieParsing');
//require('./middlewares/queryParsing');

app.get('/', (req, res) => {
	res.json({ok: true});
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    productHelper.importData();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const clArguments = parseArg(process.argv.slice(2), {});
let auth = '';

if (clArguments.authentication && clArguments.authentication == 'jwt') {
	console.log('used jwt authentication');
	auth = 'jwt';
} else {
	console.log('used passport authentication');
	auth = 'passport';
}

require('./routes/authRouter')({authentication: auth});
require('./routes/productsRouter')({authentication: auth});
require('./routes/usersRouter')({authentication: auth});

