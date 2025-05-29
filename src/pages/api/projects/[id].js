// src/pages/api/projects/[id].js
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import initMiddleware from '@/lib/middleware';
import Cors from 'cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();
  const { id } = req.query;

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Ambil data project by ID (termasuk relasi)
  if (req.method === 'GET') {
    try {
      const project = await Project.findById(id)
        .populate('location')
        .populate('contractor')
        .populate('budget')
        .populate('progress');

      if (!project) return res.status(404).json({ message: 'Project not found' });
      return res.status(200).json(project);
    } catch (error) {
      return res.status(400).json({ message: `Gagal mengambil project: ${error.message}` });
    }
  }

  // PUT: Update project, termasuk penambahan ID relasi
  if (req.method === 'PUT') {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      )
        .populate('location')
        .populate('contractor')
        .populate('budget')
        .populate('progress');

      if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
      return res.status(200).json(updatedProject);
    } catch (error) {
      return res.status(400).json({ message: `Gagal update project: ${error.message}` });
    }
  }

  // DELETE: Hapus project berdasarkan ID
  if (req.method === 'DELETE') {
    try {
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: `Gagal menghapus project: ${error.message}` });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
