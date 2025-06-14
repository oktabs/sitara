// src/pages/projects/index.jsx
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import axios from 'axios';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: {
      province: '',
      district: '',
      village: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    },
    contractor: {
      name: '',
      address: '',
      contact: ''
    },
    startDate: '',
    endDate: '',
    budget: {
      fiscalYear: '',
      fundingSource: 'APBD',
    }
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        location: {
          ...form.location,
          coordinates: {
            lat: parseFloat(form.location.coordinates.lat),
            lng: parseFloat(form.location.coordinates.lng),
          },
        },
        budget: {
          ...form.budget,
          fiscalYear: parseInt(form.budget.fiscalYear),
        }
      };

      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, payload);
      } else {
        await axios.post('/api/projects', payload);
      }

      setForm({
        name: '',
        description: '',
        location: {
          province: '',
          district: '',
          village: '',
          coordinates: { lat: '', lng: '' }
        },
        contractor: {
          name: '',
          address: '',
          contact: ''
        },
        startDate: '',
        endDate: '',
        budget: {
          fiscalYear: '',
          fundingSource: 'APBD',
        }
      });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    await axios.delete(`/api/projects/${id}`);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditingId(project._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Manajemen Proyek</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow text-black">
        {/* Nama & Deskripsi */}
        <input
          className="w-full border p-2 rounded text-black"
          placeholder="Nama Proyek"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 rounded text-black"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        {/* Lokasi */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded text-black"
            placeholder="Provinsi"
            value={form.location.province}
            onChange={(e) => setForm({ ...form, location: { ...form.location, province: e.target.value } })}
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Kecamatan"
            value={form.location.district}
            onChange={(e) => setForm({ ...form, location: { ...form.location, district: e.target.value } })}
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Desa"
            value={form.location.village}
            onChange={(e) => setForm({ ...form, location: { ...form.location, village: e.target.value } })}
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Latitude"
            value={form.location.coordinates.lat}
            onChange={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  coordinates: { ...form.location.coordinates, lat: e.target.value }
                }
              })}
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Longitude"
            value={form.location.coordinates.lng}
            onChange={(e) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  coordinates: { ...form.location.coordinates, lng: e.target.value }
                }
              })}
          />
        </div>

        {/* Kontraktor */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded text-black"
            placeholder="Nama Kontraktor"
            value={form.contractor.name}
            onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, name: e.target.value } })}
          />
          <input
            className="border p-2 rounded text-black"
            placeholder="Kontak Kontraktor"
            value={form.contractor.contact}
            onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, contact: e.target.value } })}
          />
          <input
            className="col-span-2 border p-2 rounded text-black"
            placeholder="Alamat Kontraktor"
            value={form.contractor.address}
            onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, address: e.target.value } })}
          />
        </div>

        {/* Tanggal Mulai & Selesai */}
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm text-black">
            Tanggal Mulai
            <input
              type="date"
              className="w-full border p-2 rounded text-black"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </label>
          <label className="text-sm text-black">
            Tanggal Selesai
            <input
              type="date"
              className="w-full border p-2 rounded text-black"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </label>
        </div>

        {/* Anggaran */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded text-black"
            type="number"
            placeholder="Tahun Anggaran"
            value={form.budget.fiscalYear}
            onChange={(e) => setForm({ ...form, budget: { ...form.budget, fiscalYear: e.target.value } })}
          />
          <select
            className="border p-2 rounded text-black"
            value={form.budget.fundingSource}
            onChange={(e) => setForm({ ...form, budget: { ...form.budget, fundingSource: e.target.value } })}
          >
            <option value="APBD">APBD</option>
            <option value="Village Fund">Dana Desa</option>
            <option value="Provincial Assistance">Bantuan Provinsi</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {editingId ? 'Update Proyek' : 'Tambah Proyek'}
        </button>
      </form>

      {/* List Proyek */}
      <div className="mt-8 space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow text-black">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg">{p.name}</h2>
                <p className="text-sm text-gray-700">{p.description}</p>
                <button
                  onClick={() => window.location.href = `/projects/${p._id}/budget`}
                  className="bg-green-600 text-white text-sm px-3 py-1 rounded mt-2 inline-block"
                >
                  Tambah Budget
                </button>
                <Link href={`/projects/${p._id}/news`}>
                  <button className="text-white bg-blue-600 px-3 py-1 rounded">Tambah Berita</button>
                </Link>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600 text-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
