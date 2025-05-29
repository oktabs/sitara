import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const project = await Project.findById(id).select('-__v');
      if (!project) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json(project);
    }

    if (req.method === 'PUT') {
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json(updatedProject);
    }

    if (req.method === 'DELETE') {
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json({ message: 'Project deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
