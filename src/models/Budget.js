// src/models/Budget.js
import mongoose from 'mongoose';
import ItemSchema from './Item.js';

const BudgetSchema = new mongoose.Schema({
  fiscalYear: Number,
  fundingSource: { type: String, enum: ['APBD', 'Village Fund', 'Provincial Assistance'] },
  items: [ItemSchema],
  totalBudget: Number,
});

export default BudgetSchema;
