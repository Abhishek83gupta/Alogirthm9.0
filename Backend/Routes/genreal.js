

const express = require('express');
const genralrouter = express.Router();

const { createPatientRecord, getPatientRecords } = require('../controller/general_con');

genralrouter.post('/patients', createPatientRecord);
genralrouter.get('/patients', getPatientRecords);


module.exports = genralrouter;