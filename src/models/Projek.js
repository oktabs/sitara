// src/models/Projek.js
import mongoose from "mongoose";

const ProjekSchema = new mongoose.Schema({
  nama_proyek: { type: String, required: true, maxlength: 255 },
  deskripsi: { type: String },
  lokasi: { type: String, maxlength: 255 },
  status: {
    type: String,
    enum: ["perencanaan", "berjalan", "selesai"],
    default: "perencanaan",
  },
  tanggal_mulai: { type: Date },
  tanggal_selesai: { type: Date },
  detail_anggaran: { type: Number, default: 0 },
  id_pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
  mongoose.model("Projek", ProjekSchema);
