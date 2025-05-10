// src/pages/admin/berita/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

export default function HapusBeritaPage() {
  const [beritas, setBeritas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      console.log("Token Tersedia!");
    }
  }, []);

  useEffect(() => {
    const fetchBeritas = async () => {
      try {
        const res = await fetch("/api/berita");
        const data = await res.json();
        setBeritas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritas();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        const res = await fetch(`/api/berita/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setBeritas(beritas.filter((berita) => berita._id !== id));
        }
      } catch (err) {
        console.error("Gagal menghapus berita:", err);
      }
    }
  };

  if (loading) return <div className="p-6 text-gray-700">Memuat...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      {/* <KontraktorSidebar /> */}
      <main className="flex-1 p-6 ml-[256px] bg-gray-100 min-h-screen text-gray-800">
        <div className="ml-5 mr-5 flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Hapus Berita</h1>
          <Link href="/admin/berita/tambah">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Tambah Berita Baru
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-3xl">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Tanggal Dibuat</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {beritas.map((berita) => (
                <tr key={berita._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{berita.judul}</td>
                  <td className="px-4 py-2">
                    {new Date(berita.tanggal_dibuat).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {/* <Link href={`/admin/berita/${berita._id}`}>
                      <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                        Edit
                      </button>
                    </Link> */}
                    <button
                      onClick={() => handleDelete(berita._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
