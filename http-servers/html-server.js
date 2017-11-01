const fs = require('fs');
const message = 'Hello world!';
require('http')
	.createServer()
	.on('request', (req,res) => {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		// reading file with fs module(readFileSync), replacing message and sending the response
		let fileContent = fs.readFileSync(`./http-servers/index.html`);
		fileContent = fileContent.toString().replace('{message}', message);
		res.end(fileContent);

		// pipe readable stream to response
		//fs.createReadStream('./http-servers/index.html').pipe(res);

	})
	.listen(3000);