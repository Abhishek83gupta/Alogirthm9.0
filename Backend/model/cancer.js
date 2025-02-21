const mongoose = require('mongoose');

const cancerSchema = new mongoose.Schema({
    radius_mean: { type: Number, required: true },
    texture_mean: { type: Number, required: true },
    perimeter_mean: { type: Number, required: true },
    area_mean: { type: Number, required: true },
    smoothness_mean: { type: Number, required: true },
    compactness_mean: { type: Number, required: true },
    concavity_mean: { type: Number, required: true },
    concavepoints_mean: { type: Number, required: true },
    symmetry_mean: { type: Number, required: true },
    fractaldimension_mean: { type: Number, required: true }
}, { timestamps: true });

const Cancer = mongoose.model('Cancer', cancerSchema);

module.exports = Cancer;
