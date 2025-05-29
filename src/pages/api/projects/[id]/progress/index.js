import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    const project = await Project.findById(id).select('progress');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    return res.status(200).json(project.progress);
  }

  if (req.method === 'POST') {
    const { date, percentage, notes, photoDocumentation } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.progress.push({
      date: date ? new Date(date) : new Date(),
      percentage,
      notes,
      photoDocumentation,
    });

    await project.save();
    return res.status(201).json(project.progress.at(-1));
  }

  res.status(405).json({ error: 'Method not allowed' });
}
