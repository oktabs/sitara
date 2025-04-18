// src/pages/admin/berita/create.js
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    foto: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/berita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/berita");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Gagal menambahkan berita");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="ml-[256px] text-black">
        <h1>Tambah Berita</h1>
        <Link href="/admin/berita">
          <button>Kembali ke Daftar</button>
        </Link>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Judul:</label>
            <br />
            <input
              type="text"
              name="judul"
              placeholder="judul berita"
              value={formData.judul}
              onChange={handleChange}
              required
              maxLength={255}
            />
          </div>

          <div>
            <label>Isi:</label>
            <br />
            <textarea
              name="isi"
              placeholder="isi berita"
              value={formData.isi}
              onChange={handleChange}
              required
              rows={10}
            />
          </div>

          <div>
            <label>URL Foto (opsional):</label>
            <br />
            <input
              placeholder="url gambar"
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
            />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <button
            className="p-3 border border-black/15 rounded-full w-[200px] mt-2"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
