// src/pages/api/projects/index.js
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import initMiddleware from '@/lib/middleware';
import Cors from 'cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Ambil semua project lengkap (walaupun ada relasi yang belum diisi)
  if (req.method === 'GET') {
    try {
      const projects = await Project.find()
        .populate('location')
        .populate('contractor')
        .populate('budget')
        .populate('progress')
        .sort({ createdAt: -1 });

      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: `Gagal mengambil data: ${error.message}` });
    }
  }

  // POST: Buat project tanpa id relasi (hanya data utama)
  if (req.method === 'POST') {
    try {
      const {
        name,
        description,
        startDate,
        endDate,
        status
      } = req.body;

      const newProject = new Project({
        name,
        description,
        startDate,
        endDate,
        status: status || 'perencanaan'
      });

      const savedProject = await newProject.save();
      return res.status(201).json(savedProject);
    } catch (error) {
      return res.status(400).json({ message: `Gagal menambahkan data: ${error.message}` });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
