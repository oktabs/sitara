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
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const contractor = await Contractor.findById(id);
      if (!contractor) return res.status(404).json({ message: 'Contractor not found' });
      return res.status(200).json(contractor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedContractor = await Contractor.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedContractor) return res.status(404).json({ message: 'Contractor not found' });
      return res.status(200).json(updatedContractor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedContractor = await Contractor.findByIdAndDelete(id);
      if (!deletedContractor) return res.status(404).json({ message: 'Contractor not found' });
      return res.status(200).json({ message: 'Contractor deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
