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

      router.push("/admin/proyek");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <KontraktorSidebar />
      <div className="ml-[256px] text-black">
        {/* <h1>Tambah Proyek Baru</h1>
        <button onClick={() => router.push("/admin/proyek")}>
          Kembali ke Daftar
        </button> */}

        {error && <div>Error: {error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>URL Gambar Proyek</label>
            <br />
            <input
              type="url"
              name="url_gambar"
              value={formData.url_gambar}
              onChange={handleChange}
              placeholder="https://gambar.com/image.jpg"
            />
          </div>

          <div>
            <label>Nama Proyek*</label>
            <br />
            <input
              type="text"
              placeholder="Nama proyek"
              name="nama_proyek"
              value={formData.nama_proyek}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Deskripsi Proyek</label>
            <br />
            <textarea
              name="deskripsi"
              placeholder="Deskripsi proyek"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <label>Progress (%)</label>
            <br />
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
            <label>Lokasi Proyek</label>
            <br />
            <input
              type="text"
              name="lokasi"
              placeholder="Lokasi proyek"
              value={formData.lokasi}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Status Proyek</label>
            <br />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="perencanaan">Perencanaan</option>
              <option value="berjalan">Berjalan</option>
              <option value="selesai">Selesai</option>
              <option value="mangkrak">Mangkrak</option>
            </select>
          </div>

          <div>
            <label>Tanggal Mulai</label>
            <br />
            <input
              type="date"
              name="tanggal_mulai"
              value={formData.tanggal_mulai}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tanggal Selesai</label>
            <br />
            <input
              type="date"
              name="tanggal_selesai"
              value={formData.tanggal_selesai}
              onChange={handleChange}
            />
          </div>

          <h2>Detail Anggaran</h2>

          <div>
            <label>Total Anggaran (Rp)</label>
            <br />
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
            <br />
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
            <br />
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
            <br />
            <input
              type="url"
              name="detail_anggaran.dokumen_anggaran"
              value={formData.detail_anggaran.dokumen_anggaran}
              onChange={handleChange}
              placeholder="https://example.com/document.pdf"
            />
          </div>

          <h3>Rincian Komponen Anggaran</h3>

          <div>
            <label>Material (Rp)</label>
            <br />
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
            <br />
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
            <br />
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
            <br />
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
            <br />
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
            <br />
            <input
              type="text"
              name="detail_anggaran.tahun_anggaran"
              value={formData.detail_anggaran.tahun_anggaran}
              onChange={handleChange}
            />
          </div>

          <button
            className="p-3 border border-black/15 rounded-full mt-5 mb-5"
            type="submit"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Proyek"}
          </button>
        </form>
      </div>
    </div>
  );
}
