// src/pages/projects/[id]/news.jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    photo: '',
    createdAt: new Date().toISOString().substring(0, 10),
  });
  const [editingId, setEditingId] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`/api/projects/${id}/news`);
      setNewsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/projects/${id}/news/${editingId}`, form);
      } else {
        await axios.post(`/api/projects/${id}/news`, form);
      }
      setForm({
        title: '',
        content: '',
        photo: '',
        createdAt: new Date().toISOString().substring(0, 10),
      });
      setEditingId(null);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (newsId) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;
    try {
      await axios.delete(`/api/projects/${id}/news/${newsId}`);
      fetchNews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (news) => {
    setForm({
      title: news.title,
      content: news.content,
      photo: news.photo,
      createdAt: news.createdAt.substring(0, 10),
    });
    setEditingId(news._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Berita Proyek</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded">
        <input
          className="w-full border p-2 rounded"
          placeholder="Judul Berita"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Isi Berita"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Link Foto"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.createdAt}
          onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update Berita' : 'Tambah Berita'}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {newsList.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{item.createdAt?.substring(0, 10)}</p>
            <p>{item.content}</p>
            {item.photo && (
              <img src={item.photo} alt="Berita" className="mt-2 w-full max-h-64 object-cover" />
            )}
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(item)} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
