'use strict';

const config = require('./config/config');
console.log(config.name);

const models = require('./models');
new models.User();
new models.Product();