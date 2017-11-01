const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));

require('./middlewares/cookieParsing');
require('./middlewares/queryParsing');

app.get('/', (req, res) => {
	res.json({ok: true});
});

require('./routes/productsRouter');
require('./routes/usersRouter');