const Heart = require('../model/heart');

// Create a new heart record
const createHeartRecord = async (req, res) => {
    try {
        const heartData = new Heart(req.body);
        await heartData.save();
        res.status(201).json(heartData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all heart records
const getHeartRecords = async (req, res) => {
    try {
        const records = await Heart.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createHeartRecord, getHeartRecords };
