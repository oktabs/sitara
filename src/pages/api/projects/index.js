import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  if (req.method === 'GET') {
    const projects = await Project.find().select('-__v');
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    try {
      const { budget, ...rest } = req.body;

      const newProject = new Project({
        ...rest,
        budget: {
          ...budget,
          items: [] 
        },
        progress: [],
        news: [],
      });

      await newProject.save();
      return res.status(201).json(newProject);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
