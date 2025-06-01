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
      headers: { "Content-Type": "application/json" },
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

    if (res.ok) router.push("/projects/all");
    else alert("Gagal menyimpan proyek");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="pt-32 px-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl w-full max-w-6xl"
        >
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Tambah Proyek Baru
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Nama Proyek
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-3xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Lokasi
                </h2>
                <div className="space-y-3">
                  <input
                    name="location.province"
                    placeholder="Provinsi"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="location.district"
                    placeholder="Kabupaten"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="location.village"
                    placeholder="Desa"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="location.coordinates.lat"
                    placeholder="Latitude"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="location.coordinates.lng"
                    placeholder="Longitude"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Kontraktor
                </h2>
                <div className="space-y-3">
                  <input
                    name="contractor.name"
                    placeholder="Nama Kontraktor"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="contractor.address"
                    placeholder="Alamat"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="contractor.contact"
                    placeholder="Kontak"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Tanggal
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Anggaran
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="budget.fiscalYear"
                    placeholder="Tahun Anggaran"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                  <input
                    name="budget.fundingSource"
                    placeholder="Sumber Dana"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-3xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-5 rounded-full font-semibold hover:bg-blue-700 transition duration-200"
              >
                Simpan Proyek
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
