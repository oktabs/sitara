import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";

const ProyekPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/proyek");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "perencanaan":
        return "Perencanaan";
      case "berjalan":
        return "Sedang Berjalan";
      case "selesai":
        return "Selesai";
      case "mangkrak":
        return "Mangkrak";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "selesai":
        return "bg-green-500";
      case "berjalan":
        return "bg-blue-500";
      case "perencanaan":
        return "bg-yellow-500";
      case "mangkrak":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-3 py-28"
      >
        <h1 className="text-3xl mb-5 text-black text-center">Semua Proyek</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                className="bg-white rounded-3xl overflow-hidden transition duration-300 transform hover:-translate-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={project.url_gambar}
                  alt={project.nama_proyek}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {project.nama_proyek}
                  </h3>
                  <p className="text-gray-600 mt-2">📍 {project.lokasi}</p>
                  <span
                    className={`inline-block px-4 py-1 mt-3 text-white rounded-full ${getStatusColor(project.status)}`}
                  >
                    {getStatusText(project.status)}
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(project.status)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Progres: {project.progress}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Anggaran:{" "}
                    {formatCurrency(project.detail_anggaran.total_anggaran)}
                  </p>
                  <button
                    className="mt-4 p-3 w-full border border-black/15 rounded-full text-black"
                    onClick={() => setSelectedProject(project)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {selectedProject && (
        <div className="z-50 text-black fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedProject(null)}
            >
              ✖
            </button>
            <Image
              src={selectedProject.url_gambar}
              alt={selectedProject.nama_proyek}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {selectedProject.nama_proyek}
            </h2>
            <p className="text-gray-600 mt-2">📍 {selectedProject.lokasi}</p>
            <p className="mt-4 text-gray-700">{selectedProject.deskripsi}</p>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Detail Anggaran</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>Total Anggaran:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.total_anggaran,
                  )}
                </p>

                <p>Anggaran Terpakai:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.anggaran_terpakai,
                  )}
                </p>

                <p>Sisa Anggaran:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.sisa_anggaran,
                  )}
                </p>

                <p>Persentase:</p>
                <p className="font-semibold">
                  {selectedProject.detail_anggaran.persentase_terpakai}%
                </p>

                <p>Sumber Dana:</p>
                <p className="font-semibold">
                  {selectedProject.detail_anggaran.sumber_dana}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Komponen Anggaran</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>Material:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.komponen_utama.material,
                  )}
                </p>

                <p>Tenaga Kerja:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.komponen_utama.tenaga_kerja,
                  )}
                </p>

                <p>Peralatan:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.komponen_utama.peralatan,
                  )}
                </p>

                <p>Administrasi:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.komponen_utama.administrasi,
                  )}
                </p>

                <p>Lain-lain:</p>
                <p className="font-semibold">
                  {formatCurrency(
                    selectedProject.detail_anggaran.komponen_utama.lain_lain,
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Timeline</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p>Mulai:</p>
                <p className="font-semibold">
                  {formatDate(selectedProject.tanggal_mulai)}
                </p>

                <p>Selesai:</p>
                <p className="font-semibold">
                  {formatDate(selectedProject.tanggal_selesai)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Status</h3>
              <span
                className={`inline-block px-4 py-1 mt-2 text-white rounded-full ${getStatusColor(selectedProject.status)}`}
              >
                {getStatusText(selectedProject.status)}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className={`h-2 rounded-full ${getStatusColor(selectedProject.status)}`}
                  style={{ width: `${selectedProject.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Progres: {selectedProject.progress}%
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Dokumen</h3>
              <a
                href={selectedProject.detail_anggaran.dokumen_anggaran}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lihat Dokumen Anggaran
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProyekPage;
