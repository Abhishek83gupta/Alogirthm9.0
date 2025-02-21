const General = require('../model/general');

// Create a new patient record
const createPatientRecord = async (req, res) => {
    try {
        const patientData = new General(req.body);
        await patientData.save();
        res.status(201).json(patientData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all patient records
const getPatientRecords = async (req, res) => {
    try {
        const records = await General.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPatientRecord, getPatientRecords };
