'use strict';
let fs = require('fs');

class DirWatcher {
	constructor (eventEmitter) {
		console.log('DirWatcher module');
		this.eventEmitter = eventEmitter;
	}

	watch(path, delay) {
		let self = this;

		setTimeout(() => {
			fs.watch(path, (eventType, filename) => {
				if (filename && eventType == 'change') {
					console.log('emit change event');
					self.eventEmitter.emit('dirwatcher:changed', filename);
				}
			});
		}, delay);
	}
}

module.exports = DirWatcher;