const express = require('express');
const router = express.Router();
const { createCancerRecord, getCancerRecords } = require('../controller/cancer_con');
// const { createDiabetesRecord, getDiabetesRecords } = require('../controller/Diabetes_con');
// const { createPatientRecord, getPatientRecords } = require('../controller/general_con');
// const { createHeartRecord, getHeartRecords } = require('../controller/heart_con');
// const { createLiverRecord, getLiverRecords } = require('../controller/liver_con');



router.post('/cancer', createCancerRecord);
router.get('/cancer', getCancerRecords);


// router.post('/diabetes', createDiabetesRecord);
// router.get('/diabetes', getDiabetesRecords);


// router.post('/patients', createPatientRecord);
// router.get('/patients', getPatientRecords);


// router.post('/heart', createHeartRecord);
// router.get('/heart', getHeartRecords);

// router.post('/liver', createLiverRecord);
// router.get('/liver', getLiverRecords);


module.exports = router;