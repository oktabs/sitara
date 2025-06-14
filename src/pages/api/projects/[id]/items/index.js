// src/pages/api/projects/[id]/items/index.js
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id } = req.query;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Method GET: Ambil semua item
    if (req.method === 'GET') {
      return res.status(200).json({
        items: project.budget.items,
        totalBudget: project.budget.totalBudget
      });
    }

    // Method POST (atau bisa kamu ubah jadi PUT): Tambah item baru
    if (req.method === 'POST') {
      const item = req.body;

      // Hitung total otomatis
      item.total = (item.volume || 0) * (item.unitPrice || 0);

      project.budget.items.push(item);

      // Hitung ulang totalBudget
      project.budget.totalBudget = project.budget.items.reduce(
        (sum, i) => sum + (i.total || 0),
        0
      );

      await project.save();

      return res.status(201).json({
        message: 'Item added',
        items: project.budget.items,
        totalBudget: project.budget.totalBudget
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
