// src/models/Proyek.js
import mongoose from "mongoose";

const ProyekSchema = new mongoose.Schema({
  url_gambar: { type: String },
  nama_proyek: { type: String, required: true, maxlength: 255 },
  deskripsi: { type: String },
  progress: { type: Number },
  lokasi: { type: String, maxlength: 255 },
  status: {
    type: String,
    enum: ["perencanaan", "berjalan", "selesai", "mangkrak"],
    default: "perencanaan",
  },
  tanggal_mulai: { type: Date },
  tanggal_selesai: { type: Date },
  detail_anggaran: {
    total_anggaran: { type: Number, default: 0 },
    anggaran_terpakai: { type: Number, default: 0 },
    sisa_anggaran: { type: Number, default: 0 },
    sumber_dana: {
      type: String,
      enum: ["APBD", "APBN", "Dana Desa", "CSR", "Lainnya"],
      required: true,
    },
    dokumen_anggaran: { type: String },
    komponen_utama: {
      material: { type: Number, default: 0 },
      tenaga_kerja: { type: Number, default: 0 },
      peralatan: { type: Number, default: 0 },
      administrasi: { type: Number, default: 0 },
      lain_lain: { type: Number, default: 0 },
    },
    persentase_terpakai: { type: Number, default: 0 },
    tahun_anggaran: { type: String },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

ProyekSchema.pre("save", function (next) {
  this.detail_anggaran.sisa_anggaran =
    this.detail_anggaran.total_anggaran -
    this.detail_anggaran.anggaran_terpakai;

  if (this.detail_anggaran.total_anggaran > 0) {
    this.detail_anggaran.persentase_terpakai = Math.round(
      (this.detail_anggaran.anggaran_terpakai /
        this.detail_anggaran.total_anggaran) *
        100,
    );
  }

  next();
});

export default mongoose.models.Project ||
  mongoose.model("Proyek", ProyekSchema);
