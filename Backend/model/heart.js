const mongoose = require('mongoose');

const heartSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    sex: { type: Number, required: true },
    cp: { type: Number, required: true },
    trestbps: { type: Number, required: true },
    chol: { type: Number, required: true },
    fbs: { type: Number, required: true },
    restecg: { type: Number, required: true },
    thalach: { type: Number, required: true },
    exang: { type: Number, required: true },
    oldpeak: { type: Number, required: true },
    slope: { type: Number, required: true },
    ca: { type: Number, required: true },
    thal: { type: Number, required: true }
}, { timestamps: true });

const Heart = mongoose.model('Health',heartSchema);

module.exports = Heart;
