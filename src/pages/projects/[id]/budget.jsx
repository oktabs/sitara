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
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Manajemen Anggaran Proyek</h1>

      {/* Form Tambah / Edit */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-2">
        <input
          className="w-full border p-2 rounded text-black"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="grid grid-cols-3 gap-4">
          <input
            className="border p-2 rounded text-black"
            type="number"
            placeholder="Volume"
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Satuan"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded text-black"
            type="number"
            placeholder="Harga Satuan"
            value={form.unitPrice}
            onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {editingItemId ? 'Update Item' : 'Tambah Item'}
        </button>
      </form>

      {/* List Items */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Rincian Anggaran</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">Belum ada item.</p>
        ) : (
          <table className="w-full table-auto border text-sm text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Deskripsi</th>
                <th className="border p-2">Volume</th>
                <th className="border p-2">Satuan</th>
                <th className="border p-2">Harga Satuan</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">{item.volume}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">Rp {item.unitPrice?.toLocaleString()}</td>
                  <td className="border p-2 font-semibold">Rp {item.total?.toLocaleString()}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan="4" className="border p-2 text-right">Total Anggaran:</td>
                <td colSpan="2" className="border p-2">Rp {totalBudget.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
