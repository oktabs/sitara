// src/models/Contractor.js
import mongoose from 'mongoose';

const ContractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
  address: String,
  taxIdNumber: String, // npwp
});

export default ContractorSchema;
