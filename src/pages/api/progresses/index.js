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

  if (req.method === 'GET') {
    const { projectId } = req.query;
    const filter = projectId ? { idProject: projectId } : {};
    const progresses = await Progress.find(filter).sort({ tanggal: -1 });
    return res.status(200).json(progresses);
  }

  if (req.method === 'POST') {
    try {
      const newProgress = new Progress(req.body);
      const savedProgress = await newProgress.save();
      return res.status(201).json(savedProgress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
