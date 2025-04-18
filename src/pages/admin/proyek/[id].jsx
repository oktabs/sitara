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

    // Handle nested objects
    if (name.startsWith("detail_anggaran.")) {
      const [parent, child, grandchild] = name.split(".");

      if (grandchild) {
        // For komponen_utama fields
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
        // For other detail_anggaran fields
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      }
    } else {
      // For top level fields
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan proyek");
      }

      router.push("/admin/proyek");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <h1>{isEditMode ? "Edit Proyek" : "Tambah Proyek Baru"}</h1>
      <Link href="/admin/proyek">
        <button>Kembali ke Daftar</button>
      </Link>

      {error && <div>Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>URL Gambar</label>
          <input
            type="url"
            name="url_gambar"
            value={formData.url_gambar}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label>Nama Proyek*</label>
          <input
            type="text"
            name="nama_proyek"
            value={formData.nama_proyek}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <label>Progress (%)</label>
          <input
            type="number"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="perencanaan">Perencanaan</option>
            <option value="berjalan">Berjalan</option>
            <option value="selesai">Selesai</option>
            <option value="mangkrak">Mangkrak</option>
          </select>
        </div>

        <div>
          <label>Tanggal Mulai</label>
          <input
            type="date"
            name="tanggal_mulai"
            value={formData.tanggal_mulai?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tanggal Selesai</label>
          <input
            type="date"
            name="tanggal_selesai"
            value={formData.tanggal_selesai?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </div>

        <h2>Detail Anggaran</h2>

        <div>
          <label>Total Anggaran (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.total_anggaran"
            value={formData.detail_anggaran.total_anggaran}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Anggaran Terpakai (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.anggaran_terpakai"
            value={formData.detail_anggaran.anggaran_terpakai}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Sumber Dana</label>
          <select
            name="detail_anggaran.sumber_dana"
            value={formData.detail_anggaran.sumber_dana}
            onChange={handleChange}
          >
            <option value="APBD">APBD</option>
            <option value="APBN">APBN</option>
            <option value="Dana Desa">Dana Desa</option>
            <option value="CSR">CSR</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label>Dokumen Anggaran (URL)</label>
          <input
            type="url"
            name="detail_anggaran.dokumen_anggaran"
            value={formData.detail_anggaran.dokumen_anggaran}
            onChange={handleChange}
            placeholder="https://example.com/document.pdf"
          />
        </div>

        <h3>Komponen Utama Anggaran</h3>

        <div>
          <label>Material (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.komponen_utama.material"
            value={formData.detail_anggaran.komponen_utama.material}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Tenaga Kerja (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.komponen_utama.tenaga_kerja"
            value={formData.detail_anggaran.komponen_utama.tenaga_kerja}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Peralatan (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.komponen_utama.peralatan"
            value={formData.detail_anggaran.komponen_utama.peralatan}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Administrasi (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.komponen_utama.administrasi"
            value={formData.detail_anggaran.komponen_utama.administrasi}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Lain-lain (Rp)</label>
          <input
            type="number"
            name="detail_anggaran.komponen_utama.lain_lain"
            value={formData.detail_anggaran.komponen_utama.lain_lain}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div>
          <label>Tahun Anggaran</label>
          <input
            type="text"
            name="detail_anggaran.tahun_anggaran"
            value={formData.detail_anggaran.tahun_anggaran}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
