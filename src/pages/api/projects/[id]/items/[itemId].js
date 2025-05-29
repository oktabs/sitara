import connectDB from '@lib/mongodb';
import Project from '@models/Project';
import cors from '@middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ error: 'Project not found' });

      project.budget.items.push(req.body);

      project.budget.totalBudget = project.budget.items.reduce(
        (sum, item) => sum + (item.total || 0), 0
      );

      await project.save();
      return res.status(201).json(project.budget.items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
