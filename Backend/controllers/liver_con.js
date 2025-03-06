const Liver = require('../models/liver');

// Create a new liver record
const createLiverRecord = async (req, res) => {
    try {
        const liverData = new Liver(req.body);
        await liverData.save();
        res.status(201).json(liverData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all liver records
const getLiverRecords = async (req, res) => {
    try {
        const records = await Liver.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createLiverRecord, getLiverRecords };
