import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

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
        router.push("/admin/berita/read");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Gagal mengupdate berita");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        Memuat...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-medium">
        Error: {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#EEEEEE] text-black">
      <Sidebar />

      <main className="ml-[240px] w-full p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-blue-600">Edit Berita</h1>

          <Link href="/admin/berita">
            <button className="mb-6 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              ⬅ Kembali ke Daftar
            </button>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow space-y-6"
          >
            <div>
              <label className="block mb-1 text-sm font-medium">Judul:</label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
                maxLength={255}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Isi:</label>
              <textarea
                name="isi"
                value={formData.isi}
                onChange={handleChange}
                required
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">URL Foto (opsional):</label>
              <input
                type="text"
                name="foto"
                value={formData.foto}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && <div className="text-red-600 font-medium">{error}</div>}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
