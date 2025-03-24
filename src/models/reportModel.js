import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  id_proyek: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  id_pengguna: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deskripsi: { type: String },
  persentase_progress: { type: Number, min: 0, max: 100 },
  foto: { type: String },
  tanggal: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
