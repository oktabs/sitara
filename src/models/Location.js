// src/models/Location.js
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  district: { type: String, required: true },  
  village: { type: String, required: true },   
  address: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

export default LocationSchema;
