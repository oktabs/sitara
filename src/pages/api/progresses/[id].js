import connectDB from '@/lib/mongodb';
import Progress from '@/models/Progress';
import initMiddleware from '@/lib/middleware';
import Cors from 'cors';

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
      const progress = await Progress.findById(id);
      if (!progress) return res.status(404).json({ message: 'Progress not found' });
      return res.status(200).json(progress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedProgress = await Progress.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProgress) return res.status(404).json({ message: 'Progress not found' });
      return res.status(200).json(updatedProgress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedProgress = await Progress.findByIdAndDelete(id);
      if (!deletedProgress) return res.status(404).json({ message: 'Progress not found' });
      return res.status(200).json({ message: 'Progress deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
