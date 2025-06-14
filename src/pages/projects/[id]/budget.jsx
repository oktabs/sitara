import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function BudgetPage() {
  const router = useRouter();
  const { id } = router.query;

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    description: '',
    volume: '',
    unit: '',
    unitPrice: '',
  });
  const [totalBudget, setTotalBudget] = useState(0);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`/api/projects/${id}/items`);
      setItems(res.data.items || []);
      setTotalBudget(res.data.totalBudget || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        volume: parseFloat(form.volume),
        unitPrice: parseFloat(form.unitPrice),
      };

      if (editingItemId) {
        await axios.put(`/api/projects/${id}/items/${editingItemId}`, payload);
        setEditingItemId(null);
      } else {
        await axios.post(`/api/projects/${id}/items`, payload);
      }

      setForm({
        description: '',
        volume: '',
        unit: '',
        unitPrice: '',
      });
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingItemId(item._id);
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    await axios.delete(`/api/projects/${id}/items/${itemId}`);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Budget Management
          </h1>
          <p className="text-gray-600">Manage project budget items and allocations</p>
        </div>

        {/* Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            {editingItemId ? 'Edit Budget Item' : 'Add New Budget Item'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Item Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="number"
                  placeholder="Volume"
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  required
                />
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs text-gray-500">Volume</label>
              </div>
              
              <div className="relative">
                <input
                  className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Unit (e.g., m3, kg)"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  required
                />
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs text-gray-500">Unit</label>
              </div>
              
              <div className="relative">
                <input
                  className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="number"
                  placeholder="Unit Price"
                  value={form.unitPrice}
                  onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
                  required
                />
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs text-gray-500">Unit Price (IDR)</label>
              </div>
            </div>
            
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              type="submit"
            >
              {editingItemId ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </div>

        {/* Budget Items Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              Budget Breakdown
            </h2>
          </div>
          
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No budget items added yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Volume</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Unit</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Unit Price</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Total</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id} className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/50'}`}>
                      <td className="p-4 text-black font-medium">{item.description}</td>
                      <td className="p-4 text-center text-black">{item.volume}</td>
                      <td className="p-4 text-center text-black">{item.unit}</td>
                      <td className="p-4 text-right text-black">Rp {item.unitPrice?.toLocaleString()}</td>
                      <td className="p-4 text-right font-bold text-black">Rp {item.total?.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-t-2 border-blue-200">
                    <td colSpan="4" className="p-6 text-right font-bold text-lg text-gray-800">Total Budget:</td>
                    <td colSpan="2" className="p-6 font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Rp {totalBudget.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
