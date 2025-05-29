// src/models/News.js
import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  photo: { type: String },
});

export default NewsSchema;
