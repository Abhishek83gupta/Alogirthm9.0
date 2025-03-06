const express = require('express');
const router = express.Router();
const { createCancerRecord, getCancerRecords } = require('../controllers/cancer_con');

router.post('/cancer', createCancerRecord);
router.get('/cancer', getCancerRecords);

module.exports = router;