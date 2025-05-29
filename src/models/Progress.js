// src/models/Progress.js
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  percentage: { type: Number, min: 0, max: 100 },
  notes: String,
  photoDocumentation: [String],
});

export default ProgressSchema;
