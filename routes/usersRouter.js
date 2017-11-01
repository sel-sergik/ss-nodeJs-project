const express = require('express');
const app = require('../app');
const router = express.Router();
const fs = require('fs');

const usedData = JSON.parse(fs.readFileSync('./data/data.json').toString())[0];

router.get('/', (req, res) => {
	res.json(usedData.users)
});

app.use('/users', router);