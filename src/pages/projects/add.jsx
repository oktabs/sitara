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
          className="bg-gray-100 p-10 rounded-3xl w-full max-w-6xl"
        >
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Tambah Proyek Baru
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Informasi Dasar Proyek
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Proyek*
                    </label>
                    <input
                      name="name"
                      onChange={handleChange}
                      placeholder="Contoh: Pembangunan Jalan Desa XYZ"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi Proyek*
                    </label>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      placeholder="Jelaskan detail proyek, tujuan, dan manfaatnya..."
                      className="w-full p-3 border border-gray-300 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Lokasi Proyek
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provinsi*
                    </label>
                    <input
                      name="location.province"
                      placeholder="Contoh: Jawa Barat"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kabupaten/Kota*
                    </label>
                    <input
                      name="location.district"
                      placeholder="Contoh: Kabupaten Bandung"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Desa/Kelurahan*
                    </label>
                    <input
                      name="location.village"
                      placeholder="Contoh: Desa Mekarwangi"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude*
                      </label>
                      <input
                        name="location.coordinates.lat"
                        placeholder="Contoh: -6.914744"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude*
                      </label>
                      <input
                        name="location.coordinates.lng"
                        placeholder="Contoh: 107.609810"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* Contractor Section */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Informasi Kontraktor
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Kontraktor*
                    </label>
                    <input
                      name="contractor.name"
                      placeholder="Contoh: PT Bangun Jaya Abadi"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Kontraktor
                    </label>
                    <input
                      name="contractor.address"
                      placeholder="Contoh: Jl. Merdeka No. 123, Jakarta"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kontak*
                    </label>
                    <input
                      name="contractor.contact"
                      placeholder="Contoh: 08123456789 atau email@kontraktor.com"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Timeline Proyek
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Mulai*
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Selesai*
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Anggaran Proyek
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun Anggaran*
                    </label>
                    <input
                      name="budget.fiscalYear"
                      placeholder="Contoh: 2023"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sumber Dana*
                    </label>
                    <input
                      name="budget.fundingSource"
                      placeholder="Contoh: APBD Kabupaten/Dana Desa"
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-6"
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
