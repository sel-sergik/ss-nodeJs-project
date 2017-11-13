'use strict';

const parseArg = require('minimist');
const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));

//require('./middlewares/cookieParsing');
//require('./middlewares/queryParsing');

app.get('/', (req, res) => {
	res.json({ok: true});
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
