const express = require('express');
const heartrouter = express.Router();

const { createHeartRecord, getHeartRecords } = require('../controllers/heart_con');

heartrouter.post('/heart', createHeartRecord);
heartrouter.get('/heart', getHeartRecords);


module.exports = heartrouter;