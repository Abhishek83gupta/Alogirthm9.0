const Diabetes = require('../models/Diabetes.js');


// Create a new diabetes record
const createDiabetesRecord = async (req, res) => {
    try {
        const diabetesData = new Diabetes(req.body);
        await diabetesData.save();
        res.status(201).json(diabetesData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all diabetes records
const getDiabetesRecords = async (req, res) => {
    try {
        const records = await Diabetes.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createDiabetesRecord, getDiabetesRecords };