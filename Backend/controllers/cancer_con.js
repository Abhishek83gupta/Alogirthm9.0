const Cancer = require('../models/cancer');

const createCancerRecord = async (req, res) => {

    try {
        const cancerData = new Cancer(req.body);
        await cancerData.save();
        res.status(201).json(cancerData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getCancerRecords = async (req, res) => {
    try {
        const records = await Cancer.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createCancerRecord, getCancerRecords };