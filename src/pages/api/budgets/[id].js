import connectDB from '@/lib/mongodb';
import Budget from '@/models/Budget';
import initMiddleware from '@/lib/middleware';
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const budget = await Budget.findById(id);
      if (!budget) return res.status(404).json({ message: 'Budget not found' });
      return res.status(200).json(budget);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedBudget) return res.status(404).json({ message: 'Budget not found' });
      return res.status(200).json(updatedBudget);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedBudget = await Budget.findByIdAndDelete(id);
      if (!deletedBudget) return res.status(404).json({ message: 'Budget not found' });
      return res.status(200).json({ message: 'Budget deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
