// src/pages/api/projects/[id]/items/[itemId].js
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id, itemId } = req.query;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const itemIndex = project.budget.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });

    // UPDATE ITEM
    if (req.method === 'PUT') {
      const { description, volume, unit, unitPrice } = req.body;

      // Update item
      const updatedItem = project.budget.items[itemIndex];
      updatedItem.description = description ?? updatedItem.description;
      updatedItem.volume = volume ?? updatedItem.volume;
      updatedItem.unit = unit ?? updatedItem.unit;
      updatedItem.unitPrice = unitPrice ?? updatedItem.unitPrice;
      updatedItem.total = (updatedItem.volume || 0) * (updatedItem.unitPrice || 0);

      // Hitung ulang totalBudget
      project.budget.totalBudget = project.budget.items.reduce(
        (sum, item) => sum + (item.total || 0), 0
      );

      await project.save();
      return res.status(200).json({ message: 'Item updated', item: updatedItem });
    }

    // DELETE ITEM
    if (req.method === 'DELETE') {
      project.budget.items.splice(itemIndex, 1);

      // Recalculate totalBudget
      project.budget.totalBudget = project.budget.items.reduce(
        (sum, item) => sum + (item.total || 0), 0
      );

      await project.save();
      return res.status(200).json({ message: 'Item deleted', items: project.budget.items });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
