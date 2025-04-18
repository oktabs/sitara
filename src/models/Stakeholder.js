// src/models/Skateholder.js
import mongoose from "mongoose";

const StakeholderSchema = new mongoose.Schema({
  id_proyek: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  nama: { type: String, maxlength: 255 },
  jabatan: { type: String, maxlength: 255 },
  kontak: { type: String, maxlength: 100 },
  email: { type: String, maxlength: 100 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Stakeholder ||
  mongoose.model("Stakeholder", StakeholderSchema);
