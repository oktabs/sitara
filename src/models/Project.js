// src/models/Project.js
import mongoose from 'mongoose';
import LocationSchema from './Location';
import ContractorSchema from './Contractor';
import BudgetSchema from './Budget';
import ProgressSchema from './Progress';
import NewsSchema from './News';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: LocationSchema,
  contractor: ContractorSchema,
  startDate: Date,
  endDate: Date,
  budget: BudgetSchema,
  progress: [ProgressSchema],
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'delayed'],
    default: 'planning',
  },
  news: [NewsSchema],
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
