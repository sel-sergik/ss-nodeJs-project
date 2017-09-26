'use strict';

const config = require('./config/config');
console.log(config.name);

const models = require('./models');
new models.User();
new models.Product();

const EventEmitter = require('events');
const myEE = new EventEmitter();

const importer = new models.Importer(myEE);

const dirwatcher = new models.DirWatcher(myEE);
dirwatcher.watch('./data', 2000);