// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["kontraktor_desa", "admin_kecamatan", "masyarakat"],
    default: "masyarakat",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
