const mongoose = require('mongoose');

const liverSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    tot_bilirubin: { type: Number, required: true },
    direct_bilirubin: { type: Number, required: true },
    tot_proteins: { type: Number, required: true },
    albumin: { type: Number, required: true },
    ag_ratio: { type: Number, required: true },
    sgpt: { type: Number, required: true },
    sgot: { type: Number, required: true },
    alkphos: { type: Number, required: true }
}, { timestamps: true });

const Liver = mongoose.model('Liver', liverSchema);

module.exports = Liver;
