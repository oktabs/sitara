import connectDB from '@/lib/mongodb';
import Location from '@/models/Location';
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
    const locations = await Location.find(filter).sort({ kecamatan: 1 });
    return res.status(200).json(locations);
  }

  if (req.method === 'POST') {
    try {
      const newLocation = new Location(req.body);
      const savedLocation = await newLocation.save();
      return res.status(201).json(savedLocation);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
