const express = require('express');
const liverrouter = express.Router();

const { createLiverRecord, getLiverRecords } = require('../controllers/liver_con');

liverrouter.post('/liver', createLiverRecord);
liverrouter.get('/liver', getLiverRecords);


module.exports = liverrouter;