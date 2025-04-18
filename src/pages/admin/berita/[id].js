// src/pages/admin/berita/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditBeritaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    foto: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/berita/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            judul: data.judul,
            isi: data.isi,
            foto: data.foto || "",
          });
        } else {
          setError(data.error || "Gagal memuat data berita");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

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
      const res = await fetch(`/api/berita/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/berita");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Gagal mengupdate berita");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-black">
      <h1>Edit Berita</h1>
      <Link href="/admin/berita">
        <button>Kembali ke Daftar</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul:</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            maxLength={255}
          />
        </div>

        <div>
          <label>Isi:</label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            required
            rows={10}
          />
        </div>

        <div>
          <label>URL Foto (opsional):</label>
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
          />
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
