import mongoose from 'mongoose';

const AnggaranSchema = new mongoose.Schema({
  id_proyek: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  kategori: { type: String, maxlength: 100 },
  jumlah: { type: Number, default: 0 },
  tanggal: { type: Date },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Anggaran || mongoose.model('Anggaran', AnggaranSchema);
