// src/models/Item.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  description: String,
  volume: Number,
  unit: String,
  unitPrice: Number,
  total: Number, // akan dihitung otomatis
});

// ⏱️ Pre-save middleware untuk menghitung total
ItemSchema.pre('save', function (next) {
  this.total = (this.volume || 0) * (this.unitPrice || 0);
  next();
});

// Jika digunakan sebagai subdokumen, kamu bisa juga pakai pre-validate
ItemSchema.pre('validate', function (next) {
  this.total = (this.volume || 0) * (this.unitPrice || 0);
  next();
});

export default ItemSchema;

