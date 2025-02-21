const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    Fever: { type: String, required: true, enum: ['Yes', 'No'] },
    Cough: { type: String, required: true, enum: ['Yes', 'No'] },
    Fatigue: { type: String, required: true, enum: ['Yes', 'No'] },
    DifficultyBreathing: { type: String, required: true, enum: ['Yes', 'No'] },
    Age: { type: Number, required: true },
    Gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    BloodPressure: { type: String, required: true, enum: ['Low', 'Normal', 'High'] },
    CholesterolLevel: { type: String, required: true, enum: ['Low', 'Normal', 'High'] }
}, { timestamps: true });

const general = mongoose.model('Patient', generalSchema);

module.exports = general;
