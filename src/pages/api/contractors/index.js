import connectDB from '@/lib/mongodb';
import Contractor from '@/models/Contractor';
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
    const contractors = await Contractor.find(filter).sort({ name: 1 });
    return res.status(200).json(contractors);
  }

  if (req.method === 'POST') {
    try {
      const newContractor = new Contractor(req.body);
      const savedContractor = await newContractor.save();
      return res.status(201).json(savedContractor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
