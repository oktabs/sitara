import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import cors from '@/middleware/cors';

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  const { id, newsId } = req.query;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const news = project.news.id(newsId);
  if (!news) return res.status(404).json({ error: 'News not found' });

  if (req.method === 'PUT') {
    const { title, content, createdAt, photo } = req.body;

    if (title !== undefined) news.title = title;
    if (content !== undefined) news.content = content;
    if (createdAt !== undefined) news.createdAt = new Date(createdAt);
    if (photo !== undefined) news.photo = photo;

    await project.save();
    return res.status(200).json(news);
  }

  if (req.method === 'DELETE') {
    // ❗ Perbaikan di sini:
    project.news.pull(newsId);
    await project.save();
    return res.status(200).json({ message: 'News deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
