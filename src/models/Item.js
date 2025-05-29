// src/models/Item.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  description: String,
  volume: Number,
  unit: String,
  unitPrice: Number,
  total: Number,
});

export default ItemSchema;
