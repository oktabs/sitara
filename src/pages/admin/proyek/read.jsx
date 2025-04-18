import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import KontraktorSidebar from "@/components/KontraktorSidebar";

export default function ProyekRead() {
  const [proyeks, setProyeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProyeks = async () => {
      try {
        const response = await fetch("/api/proyek");
        if (!response.ok) throw new Error("Gagal mengambil data proyek");
        const data = await response.json();
        setProyeks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProyeks();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      try {
        const response = await fetch(`/api/proyek/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Gagal menghapus proyek");

        // Update the list after deletion
        setProyeks(proyeks.filter((proyek) => proyek._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) return <div>Memuat data proyek...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <KontraktorSidebar />
      <div className="ml-[256px] text-black">
        <h1>Daftar Proyek</h1>
        <Link href="/admin/proyek/create">
          <button>Tambah Proyek Baru</button>
        </Link>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama Proyek</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Total Anggaran</th>
              <th>Sumber Dana</th>
              {/* <th>Aksi</th> */}
            </tr>
          </thead>
          <tbody>
            {proyeks.map((proyek, index) => (
              <tr key={proyek._id}>
                <td>{index + 1}</td>
                <td>
                  {proyek.url_gambar && (
                    <img
                      src={proyek.url_gambar}
                      alt={proyek.nama_proyek}
                      width="100"
                    />
                  )}
                </td>
                <td>{proyek.nama_proyek}</td>
                <td>{proyek.lokasi}</td>
                <td>{proyek.status}</td>
                <td>{proyek.progress}%</td>
                <td>{formatDate(proyek.tanggal_mulai)}</td>
                <td>{formatDate(proyek.tanggal_selesai)}</td>
                <td>{formatCurrency(proyek.detail_anggaran.total_anggaran)}</td>
                <td>{proyek.detail_anggaran.sumber_dana}</td>
                {/* <td>
                  <Link href={`/admin/proyek/${proyek._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(proyek._id)}>
                    Hapus
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
