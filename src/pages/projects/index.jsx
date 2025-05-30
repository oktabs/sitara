// pages/projects/index.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function NewProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: {
      province: "",
      district: "",
      village: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    },
    contractor: {
      name: "",
      address: "",
      contact: "",
    },
    startDate: "",
    endDate: "",
    budget: {
      fiscalYear: "",
      fundingSource: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (keys.length === 2) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: {
            ...formData[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        location: {
          ...formData.location,
          coordinates: {
            lat: parseFloat(formData.location.coordinates.lat),
            lng: parseFloat(formData.location.coordinates.lng),
          },
        },
        budget: {
          ...formData.budget,
          fiscalYear: parseInt(formData.budget.fiscalYear),
        },
      }),
    });

    if (res.ok) {
      router.push("/projects/all");
    } else {
      alert("Gagal menyimpan proyek");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="text-black min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-2xl"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Tambah Proyek Baru
          </h1>

          <div className="mb-4">
            <label>Nama Proyek</label>
            <input
              name="name"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label>Deskripsi</label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Lokasi</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="location.province"
              placeholder="Provinsi"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="location.district"
              placeholder="Kabupaten"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="location.village"
              placeholder="Desa"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="location.coordinates.lat"
              placeholder="Latitude"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="location.coordinates.lng"
              placeholder="Longitude"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Kontraktor</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              name="contractor.name"
              placeholder="Nama Kontraktor"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="contractor.address"
              placeholder="Alamat"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="contractor.contact"
              placeholder="Kontak"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Tanggal</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-2">Anggaran</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="budget.fiscalYear"
              placeholder="Tahun Anggaran"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="budget.fundingSource"
              placeholder="Sumber Dana"
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
