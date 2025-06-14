// src/pages/api/projects/[id]/news/index.js
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    const project = await Project.findById(id).select('news');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    return res.status(200).json(project.news);
  }

  if (req.method === 'POST') {
    const { title, content, createdAt, photo } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.news.push({
      title,
      content,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      photo,
    });

    await project.save();
    return res.status(201).json(project.news.at(-1));
  }

  res.status(405).json({ error: 'Method not allowed' });
}
