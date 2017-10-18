'use strict';

const helpMessage = `
The default application command
	
Usage:
	node ./utils/streams.js [--action=io] [--file=./users.csv]
	
Options:

	-h / --help
		Display this help message.

	-a / --action
		Set action name to run. You can choose next actions: io, transform-uppercase, transform-json, transform-file, bundle-css.

	-f / --file
		Set a file as an optional second argument(use for all actions except bundle-css).`;

const parseArg = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv2 = require('csv2');
const clArguments = parseArg(process.argv.slice(2), {
	alias: {'help': 'h', 'action': 'a', 'file': 'f'}
});

if ((Object.keys(clArguments)[1] == 'help' || Object.keys(clArguments)[1] == 'h') && clArguments[Object.keys(clArguments)[1]]) {
	printHelpMessage();
} else {
	const actionArg = clArguments.action || clArguments.a;
	const fileArg = clArguments.file || clArguments.f;
	const helpArg = clArguments.help || clArguments.h;

	if (!actionArg && !fileArg && !helpArg) {
		console.log("Wrong input! You can't call the module without arguments.");
		printHelpMessage();
	} else if (actionArg == 'io' && fileArg) {
		inputOutput(fileArg);
	} else if (actionArg == 'transform-uppercase' && fileArg) {
		transformUppercase(fileArg);
	} else if (actionArg == 'transform-json' && fileArg) {
		transformJson(fileArg);
	} else if (actionArg == 'transform-file' && fileArg) {
		transformFile(fileArg);
	} else if (actionArg == 'bundle-css') {
		cssBundler();
	}
}



function inputOutput(filePath) {
	console.log(`inputOutput with file: ${filePath}`);
	const reader = fs.createReadStream(filePath);
	let  result = '';

	reader.on('data', (chunk) => {
		result += chunk.toString();
	});

	reader.on('end', () => {
		console.log('Finished io');
		console.log(result);
	});
}
function transformUppercase(filePath) {
	console.log(`transformUppercase with file: ${filePath}`);
	let  result = '';

	fs.createReadStream(filePath)
	.pipe(through2(function (chunk, enc, callback) {
    	this.push(chunk.toString().toUpperCase());

    	callback()
  	}))
  	.on('data', function (data) {
		result += data;
	})
  	.on('end', () => {
		console.log('Finished transform-uppercase');
		console.log(result);
	});
}
function transformJson(filePath) {
	console.log(`transformJson with file: ${filePath}`);
	let  result = [];

	fs.createReadStream(filePath)
		.pipe(csv2())
		.pipe(through2.obj(function (chunk, enc, callback) {
			let data = {
				firstName: chunk[0],
			    lastName : chunk[1]
			}

			this.push(data);

			callback();
		}))
		.on('data', function (data) {
			result.push(data);
		})
		.on('end', function () {
			console.log('Finished transform-json');
			console.log(result);
		});
}
function transformFile(filePath) {
	console.log(`transformFile with file: ${filePath}`);
	let  result = [];
	const writer = fs.createWriteStream(filePath.replace('.csv', '.json'));

	fs.createReadStream(filePath)
		.pipe(csv2())
		.pipe(through2.obj(function (chunk, enc, callback) {
			let data = {
				firstName: chunk[0],
			    lastName : chunk[1]
			}

			this.push(JSON.stringify(data, null, 2));

			callback();
		}))
		.pipe(writer);
}

function cssBundler() {
	console.log(`cssBundler`);
}
function printHelpMessage() {
	helpMessage();
}