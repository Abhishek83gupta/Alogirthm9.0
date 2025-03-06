const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fever: { type: String, enum: ["Yes", "No"], required: true },
  cough: { type: String, enum: ["Yes", "No"], required: true },
  fatigue: { type: String, enum: ["Yes", "No"], required: true },
  difficultyBreathing: { type: String, enum: ["Yes", "No"], required: true },
  age: { type: Number, min: 0, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodPressure: { type: String, enum: ["Normal", "High"], required: true },
  cholesterolLevel: { type: String, enum: ["Normal", "High"], required: true },
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;