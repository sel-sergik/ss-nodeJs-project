'use strict';
let fs = require('fs');
const csvjson = require('csvjson');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const options = {
  delimiter : ',',
  quote     : '"'
};

class Importer {
	constructor (eventEmitter) {
		console.log('Importer module');
		this.eventEmitter = eventEmitter;

		this.eventEmitter.on('dirwatcher:changed', (path) => this.importSync(path));
		this.eventEmitter.on('dirwatcher:changed', (path) => this.import(path));
	}

	import(path) {
		return readFileAsync(`./data/${path}`, { encoding : 'utf8'})
			.then((fileContent) => { 
				const jsonResult = csvjson.toObject(fileContent, options);
				console.log("--------------------------------------------------------------------------");
				console.log('ASYNC IMPORT\n', jsonResult);
				console.log("--------------------------------------------------------------------------");
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	}

	importSync(path) {
		const fileContent = fs.readFileSync(`./data/${path}`, { encoding : 'utf8'});
		const jsonResult = csvjson.toObject(fileContent, options);
		console.log("--------------------------------------------------------------------------");
		console.log('SYNC IMPORT\n', jsonResult);
		console.log("--------------------------------------------------------------------------");
	}
}

module.exports = Importer;