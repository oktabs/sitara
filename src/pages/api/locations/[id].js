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
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const location = await Location.findById(id);
      if (!location) return res.status(404).json({ message: 'Location not found' });
      return res.status(200).json(location);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedLocation = await Location.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
      return res.status(200).json(updatedLocation);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedLocation = await Location.findByIdAndDelete(id);
      if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
      return res.status(200).json({ message: 'Location deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
