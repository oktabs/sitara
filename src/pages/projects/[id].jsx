// pages/project/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProject() {
  const [form, setForm] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/project/${id}`)
        .then(res => res.json())
        .then(data => {
          // Pastikan semua field ada
          setForm({
            name: data.name || '',
            description: data.description || '',
            startDate: data.startDate?.slice(0, 10) || '',
            endDate: data.endDate?.slice(0, 10) || '',
            status: data.status || 'planning',
            location: data.location || { address: '', city: '' },
            contractor: data.contractor || { name: '', contact: '' },
            budget: data.budget || { amount: '' },
          });
        });
    }
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`/api/project/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/project');
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Project</h1>
      <form onSubmit={handleUpdate}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <br />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <br />
        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <br />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="planning">Planning</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>

        <h4>Lokasi</h4>
        <input placeholder="Alamat" value={form.location.address} onChange={(e) => setForm({ ...form, location: { ...form.location, address: e.target.value } })} />
        <input placeholder="Kota" value={form.location.city} onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })} />

        <h4>Kontraktor</h4>
        <input placeholder="Nama Kontraktor" value={form.contractor.name} onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, name: e.target.value } })} />
        <input placeholder="Kontak" value={form.contractor.contact} onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, contact: e.target.value } })} />

        <h4>Anggaran</h4>
        <input type="number" placeholder="Jumlah (Rp)" value={form.budget.amount} onChange={(e) => setForm({ ...form, budget: { amount: e.target.value } })} />

        <br />
        <button type="submit">Simpan Perubahan</button>
        <button type="button" onClick={() => router.push('/project')}>Batal</button>
      </form>
    </div>
  );
}
