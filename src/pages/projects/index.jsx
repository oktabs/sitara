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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Project Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create, manage, and monitor government development projects
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            {editingId ? 'Edit Project' : 'Create New Project'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter project name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                    placeholder="Project description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 p-4 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 p-4 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year</label>
                    <input
                      className="w-full border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      type="number"
                      placeholder="2024"
                      value={form.budget.fiscalYear}
                      onChange={(e) => setForm({ ...form, budget: { ...form.budget, fiscalYear: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Funding Source</label>
                    <select
                      className="w-full border border-gray-200 p-4 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={form.budget.fundingSource}
                      onChange={(e) => setForm({ ...form, budget: { ...form.budget, fundingSource: e.target.value } })}
                    >
                      <option value="APBD">APBD</option>
                      <option value="Village Fund">Dana Desa</option>
                      <option value="Provincial Assistance">Bantuan Provinsi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-blue-50/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Province"
                  value={form.location.province}
                  onChange={(e) => setForm({ ...form, location: { ...form.location, province: e.target.value } })}
                />
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="District"
                  value={form.location.district}
                  onChange={(e) => setForm({ ...form, location: { ...form.location, district: e.target.value } })}
                />
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Village"
                  value={form.location.village}
                  onChange={(e) => setForm({ ...form, location: { ...form.location, village: e.target.value } })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            </div>

            {/* Contractor */}
            <div className="bg-green-50/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contractor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Contractor Name"
                  value={form.contractor.name}
                  onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, name: e.target.value } })}
                />
                <input
                  className="border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Contact Number"
                  value={form.contractor.contact}
                  onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, contact: e.target.value } })}
                />
              </div>
              <input
                className="w-full mt-4 border border-gray-200 p-4 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Contractor Address"
                value={form.contractor.address}
                onChange={(e) => setForm({ ...form, contractor: { ...form.contractor, address: e.target.value } })}
              />
            </div>

            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              type="submit"
            >
              {editingId ? 'Update Project' : 'Create Project'}
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Existing Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((p, index) => (
              <div 
                key={p._id} 
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(p)} 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => window.location.href = `/projects/${p._id}/budget`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Manage Budget
                  </button>
                  <Link href={`/projects/${p._id}/news`}>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Manage News
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No projects created yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
