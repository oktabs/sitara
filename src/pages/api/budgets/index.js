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

  if (req.method === 'GET') {
    const { projectId } = req.query;
    const filter = projectId ? { idProject: projectId } : {};
    const budgets = await Budget.find(filter).sort({ tahunAnggaran: -1 });
    return res.status(200).json(budgets);
  }

  if (req.method === 'POST') {
    try {
      const newBudget = new Budget(req.body);
      const savedBudget = await newBudget.save();
      return res.status(201).json(savedBudget);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
