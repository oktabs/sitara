// src/pages/admin/proyek/create.js
import { useState } from "react";
import { useRouter } from "next/router";
import KontraktorSidebar from "@/components/KontraktorSidebar";

export default function CreateProyek() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    url_gambar: "",
    nama_proyek: "",
    deskripsi: "",
    progress: 0,
    lokasi: "",
    status: "perencanaan",
    tanggal_mulai: "",
    tanggal_selesai: "",
    detail_anggaran: {
      total_anggaran: 0,
      anggaran_terpakai: 0,
      sumber_dana: "APBD",
      dokumen_anggaran: "",
      komponen_utama: {
        material: 0,
        tenaga_kerja: 0,
        peralatan: 0,
        administrasi: 0,
        lain_lain: 0,
      },
      tahun_anggaran: new Date().getFullYear().toString(),
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("detail_anggaran.")) {
      const [parent, child, grandchild] = name.split(".");

      if (grandchild) {
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value,
            },
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/proyek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal membuat proyek");
      }

      router.push("/admin/proyek/read");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black/75">
      <KontraktorSidebar />
      <div className="ml-[256px] p-8">
        <h1 className="text-2xl font-semibold mb-6">Tambah Proyek Baru</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-xl">
            Error: {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl space-y-6 text-sm"
        >
          {/* Input helper */}
          {[
            { label: "URL Gambar Proyek", name: "url_gambar", type: "url", placeholder: "https://gambar.com/image.jpg" },
            { label: "Nama Proyek*", name: "nama_proyek", type: "text", required: true },
            { label: "Deskripsi Proyek", name: "deskripsi", type: "textarea", rows: 4 },
            { label: "Progress (%)", name: "progress", type: "number", min: 0, max: 100 },
            { label: "Lokasi Proyek", name: "lokasi", type: "text", placeholder: "Lokasi proyek" },
            { label: "Tanggal Mulai", name: "tanggal_mulai", type: "date" },
            { label: "Tanggal Selesai", name: "tanggal_selesai", type: "date" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block mb-1 font-medium">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows={field.rows}
                  className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Status Proyek</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="perencanaan">Perencanaan</option>
              <option value="berjalan">Berjalan</option>
              <option value="selesai">Selesai</option>
              <option value="mangkrak">Mangkrak</option>
            </select>
          </div>

          <h2 className="text-lg font-semibold mt-8">Detail Anggaran</h2>

          {[
            { label: "Total Anggaran (Rp)", name: "detail_anggaran.total_anggaran" },
            { label: "Anggaran Terpakai (Rp)", name: "detail_anggaran.anggaran_terpakai" },
          ].map((field, i) => (
            <div key={i}>
              <label className="block mb-1 font-medium">{field.label}</label>
              <input
                type="number"
                name={field.name}
                min="0"
                value={field.name.split('.').reduce((o, k) => o[k], formData)}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Sumber Dana</label>
            <select
              name="detail_anggaran.sumber_dana"
              value={formData.detail_anggaran.sumber_dana}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="APBD">APBD</option>
              <option value="APBN">APBN</option>
              <option value="Dana Desa">Dana Desa</option>
              <option value="CSR">CSR</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Dokumen Anggaran (URL)</label>
            <input
              type="url"
              name="detail_anggaran.dokumen_anggaran"
              value={formData.detail_anggaran.dokumen_anggaran}
              onChange={handleChange}
              placeholder="https://example.com/document.pdf"
              className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <h3 className="text-base font-medium mt-6">Rincian Komponen Anggaran</h3>
          {["material", "tenaga_kerja", "peralatan", "administrasi", "lain_lain"].map((komponen, i) => (
            <div key={i}>
              <label className="block mb-1 font-medium capitalize">{komponen.replace("_", " ")} (Rp)</label>
              <input
                type="number"
                name={`detail_anggaran.komponen_utama.${komponen}`}
                value={formData.detail_anggaran.komponen_utama[komponen]}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Tahun Anggaran</label>
            <input
              type="text"
              name="detail_anggaran.tahun_anggaran"
              value={formData.detail_anggaran.tahun_anggaran}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-black/90 transition mt-4 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Proyek"}
          </button>
        </form>
      </div>
    </div>
  );
}
