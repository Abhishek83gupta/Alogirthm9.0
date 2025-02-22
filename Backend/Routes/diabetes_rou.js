express = require('express');
const Diabetesroutre = express.Router();

const { createDiabetesRecord, getDiabetesRecords } = require('../controller/Diabetes_con');


Diabetesroutre.post('/diabetes', createDiabetesRecord);
Diabetesroutre.get('/diabetes', getDiabetesRecords);



module.exports = Diabetesroutre;