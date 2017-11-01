const app = require('../app');

app.use('/', (req, res, next) => {
	req.parsedQuery = req.query;
	console.log('Parsed query:', req.parsedQuery);
	next();
});