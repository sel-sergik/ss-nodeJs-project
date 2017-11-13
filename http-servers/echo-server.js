'use strict';

require('http')
	.createServer((request,response) => {
		request.pipe(response);
	})
	.listen(3000);