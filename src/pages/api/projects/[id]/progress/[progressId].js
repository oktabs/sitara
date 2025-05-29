import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id, progressId } = req.query;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const progress = project.progress.id(id);
  if (!progress) return res.status(404).json({ error: 'Progress not found' });

  if (req.method === 'PUT') {
    const { date, percentage, notes, photoDocumentation } = req.body;

    if (date) progress.date = new Date(date);
    if (percentage !== undefined) progress.percentage = percentage;
    if (notes !== undefined) progress.notes = notes;
    if (photoDocumentation !== undefined) progress.photoDocumentation = photoDocumentation;

    await project.save();
    return res.status(200).json(progress);
  }

  if (req.method === 'DELETE') {
    progress.remove();
    await project.save();
    return res.status(200).json({ message: 'Progress deleted' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
