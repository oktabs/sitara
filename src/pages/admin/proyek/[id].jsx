// src/pages/admin/proyek/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProyekForm() {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);

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

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProyek = async () => {
      try {
        const response = await fetch(`/api/proyek/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data proyek");
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProyek();
  }, [id, isEditMode]);

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
      const url = isEditMode ? `/api/proyek/${id}` : "/api/proyek";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan proyek");
      }

      router.push("/admin/proyek/read");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit Proyek" : "Tambah Proyek Baru"}
      </h1>

      <Link href="/admin/proyek/read" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Kembali ke Daftar
      </Link>

      {error && <div className="mb-4 text-red-600">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "URL Gambar", name: "url_gambar", type: "url", placeholder: "https://example.com/image.jpg" },
          { label: "Nama Proyek*", name: "nama_proyek", type: "text", required: true },
          { label: "Deskripsi", name: "deskripsi", isTextarea: true, rows: 4 },
          { label: "Progress (%)", name: "progress", type: "number", min: 0, max: 100 },
          { label: "Lokasi", name: "lokasi", type: "text" },
          { label: "Tanggal Mulai", name: "tanggal_mulai", type: "date", value: formData.tanggal_mulai?.split("T")[0] || "" },
          { label: "Tanggal Selesai", name: "tanggal_selesai", type: "date", value: formData.tanggal_selesai?.split("T")[0] || "" },
        ].map(({ label, name, type, ...rest }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {rest.isTextarea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                {...rest}
              />
            ) : (
              <input
                name={name}
                type={type || "text"}
                value={rest.value ?? formData[name]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                {...rest}
              />
            )}
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {["perencanaan", "berjalan", "selesai", "mangkrak"].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-2">Detail Anggaran</h2>

        {[
          { label: "Total Anggaran (Rp)", name: "detail_anggaran.total_anggaran" },
          { label: "Anggaran Terpakai (Rp)", name: "detail_anggaran.anggaran_terpakai" },
          { label: "Dokumen Anggaran (URL)", name: "detail_anggaran.dokumen_anggaran", type: "url", placeholder: "https://example.com/document.pdf" },
        ].map(({ label, name, type, ...rest }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type || "number"}
              name={name}
              value={name.split(".").reduce((acc, part) => acc[part], formData)}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              {...rest}
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Sumber Dana</label>
          <select
            name="detail_anggaran.sumber_dana"
            value={formData.detail_anggaran.sumber_dana}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {["APBD", "APBN", "Dana Desa", "CSR", "Lainnya"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-2">Komponen Utama Anggaran</h3>

        {[
          "material",
          "tenaga_kerja",
          "peralatan",
          "administrasi",
          "lain_lain",
        ].map((key) => (
          <div key={key}>
            <label className="block font-medium mb-1">
              {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} (Rp)
            </label>
            <input
              type="number"
              name={`detail_anggaran.komponen_utama.${key}`}
              value={formData.detail_anggaran.komponen_utama[key]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="0"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Tahun Anggaran</label>
          <input
            type="text"
            name="detail_anggaran.tahun_anggaran"
            value={formData.detail_anggaran.tahun_anggaran}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
