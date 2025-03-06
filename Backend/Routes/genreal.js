

const express = require('express');
const genralrouter = express.Router();

const { createPatientRecord, getPatientRecords } = require('../controllers/general_con');

genralrouter.post('/general', createPatientRecord);
genralrouter.get('/general', getPatientRecords);


module.exports = genralrouter;