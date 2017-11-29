'use strict';

const parseArg = require('minimist');
const app = require('./app');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/nodejs';
const cityHelper = require('./helpers/mongoHelper');


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get('/', (req, res) => {
	res.json({ok: true});
});

mongoose.connect(url, function(err) {
  if (err) throw err;
  console.log("Connected correctly to server");
  cityHelper.importData(mongoose);
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
require('./routes/citiesRouter')({authentication: auth});

