import connectDB from '@lib/mongodb';
import Project from '@models/Project';
import cors from '@middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id, itemId } = req.query;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const item = project.budget.items.id(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (req.method === 'PUT') {
      Object.assign(item, req.body);
    }

    if (req.method === 'DELETE') {
      item.remove();
    }

    project.budget.totalBudget = project.budget.items.reduce(
      (sum, item) => sum + (item.total || 0), 0
    );

    await project.save();
    return res.status(200).json(project.budget.items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
