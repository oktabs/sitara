import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import KontraktorSidebar from "@/components/NavbarKontraktor";

export default function ProyekUPdate() {
  const [proyeks, setProyeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProyek, setSelectedProyek] = useState(null);
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

        setProyeks(proyeks.filter((proyek) => proyek._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const openModal = (proyek) => {
    setSelectedProyek(proyek);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProyek(null);
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

  if (loading) return <div className="text-center text-lg text-gray-500">Memuat data proyek...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

  return (
    <div className="flex">
      <KontraktorSidebar />
      <div className="ml-[256px] w-full px-6 py-8">
        <div className="mb-5 ml-5 mr-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Proyek</h2>
          <Link
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
            href="/admin/proyek/create"
          >
            Tambah Proyek Baru
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyeks.map((proyek) => (
            <div
              key={proyek._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-200 ease-in-out"
            >
              <div className="p-4">
                <div className="mb-4">
                  {proyek.url_gambar && (
                    <img
                      src={proyek.url_gambar}
                      alt={proyek.nama_proyek}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{proyek.nama_proyek}</h3>
                <p className="text-black/75 mt-2">{proyek.lokasi}</p>
                <p className="text-black/75 mt-2">{proyek.status}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-black/75">
                    <span>Tanggal Mulai</span>
                    <span>{formatDate(proyek.tanggal_mulai)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Tanggal Selesai</span>
                    <span>{formatDate(proyek.tanggal_selesai)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Total Anggaran</span>
                    <span>{formatCurrency(proyek.detail_anggaran.total_anggaran)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Anggaran Terpakai</span>
                    <span>{formatCurrency(proyek.detail_anggaran.anggaran_terpakai)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Sisa Anggaran</span>
                    <span>{formatCurrency(proyek.detail_anggaran.sisa_anggaran)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Persentase Terpakai</span>
                    <span>{proyek.detail_anggaran.persentase_terpakai}%</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => openModal(proyek)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    Lihat Detail Anggaran
                  </button>
                </div>

                <div className="flex justify-between mt-6">
                  <Link
                    href={`/admin/proyek/${proyek._id}`}
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  >
                    Edit
                  </Link>
                  {/* <button
                    onClick={() => handleDelete(proyek._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Hapus
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedProyek && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-lg p-6 w-3/4 md:w-1/2">
              <h3 className="text-xl text-black font-semibold mb-4">Detail Anggaran: {selectedProyek.nama_proyek}</h3>

              <div>
                <h4 className="font-semibold text-black/75">Komponen Anggaran</h4>
                <ul className="text-black/75">
                  <li>Material: {formatCurrency(selectedProyek.detail_anggaran.komponen_utama.material)}</li>
                  <li>Tenaga Kerja: {formatCurrency(selectedProyek.detail_anggaran.komponen_utama.tenaga_kerja)}</li>
                  <li>Peralatan: {formatCurrency(selectedProyek.detail_anggaran.komponen_utama.peralatan)}</li>
                  <li>Administrasi: {formatCurrency(selectedProyek.detail_anggaran.komponen_utama.administrasi)}</li>
                  <li>Lain-lain: {formatCurrency(selectedProyek.detail_anggaran.komponen_utama.lain_lain)}</li>
                </ul>

                <div className="mt-4">
                  <div className="flex justify-between text-black/75">
                    <span>Total Anggaran</span>
                    <span>{formatCurrency(selectedProyek.detail_anggaran.total_anggaran)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Anggaran Terpakai</span>
                    <span>{formatCurrency(selectedProyek.detail_anggaran.anggaran_terpakai)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Sisa Anggaran</span>
                    <span>{formatCurrency(selectedProyek.detail_anggaran.sisa_anggaran)}</span>
                  </div>
                  <div className="flex justify-between text-black/75 mt-2">
                    <span>Persentase Terpakai</span>
                    <span>{selectedProyek.detail_anggaran.persentase_terpakai}%</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-black/75 font-semibold">Sumber Dana</h4>
                  <p className="text-black/75">{selectedProyek.detail_anggaran.sumber_dana}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-black/75 font-semibold">Dokumen Anggaran</h4>
                  <a
                    href={selectedProyek.detail_anggaran.dokumen_anggaran}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Lihat Dokumen
                  </a>
                </div>

                <button
                  onClick={closeModal}
                  className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
