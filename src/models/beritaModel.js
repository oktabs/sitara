import mongoose from 'mongoose';

const BeritaSchema = new mongoose.Schema({
  judul: { type: String, required: true, maxlength: 255 },
  isi: { type: String, required: true },
  penulis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tanggal_dibuat: { type: Date, default: Date.now },
  foto: { type: String }
});

export default mongoose.models.Berita || mongoose.model('Berita', BeritaSchema);
