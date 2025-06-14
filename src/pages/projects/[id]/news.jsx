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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Project News
          </h1>
          <p className="text-gray-600">Manage project updates and announcements</p>
        </div>

        {/* Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            {editingId ? 'Edit News Article' : 'Add New News Article'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="News Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            
            <div className="relative">
              <textarea
                className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                placeholder="News Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Photo URL"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                />
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs text-gray-500">Photo URL</label>
              </div>
              
              <div className="relative">
                <input
                  type="date"
                  className="w-full border border-gray-200 p-4 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={form.createdAt}
                  onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
                />
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs text-gray-500">Publication Date</label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {editingId ? 'Update News' : 'Publish News'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newsList.map((item, index) => (
            <div 
              key={item._id} 
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.photo && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.photo} 
                    alt="News" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-bold text-xl text-gray-900 line-clamp-2">{item.title}</h2>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap ml-3">
                    {item.createdAt?.substring(0, 10)}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">{item.content}</p>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {newsList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No news articles published yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
