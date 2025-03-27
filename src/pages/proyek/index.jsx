import { useState } from "react";
import Navbar from "@/components/global/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    name: "Pembangunan Jalan Desa",
    location: "Desa Kalang",
    status: "Selesai",
    progress: 100,
    image: "/images/jalan.jpg",
    description: "Pembangunan jalan desa sepanjang 5 km untuk meningkatkan akses transportasi masyarakat.",
    rab: "Rp 500.000.000",
    duration: "6 bulan"
  },
  {
    id: 2,
    name: "Renovasi Balai Desa",
    location: "Desa Antang",
    status: "Sedang Berjalan",
    progress: 60,
    image: "/images/balai.jpg",
    description: "Renovasi balai desa untuk meningkatkan fasilitas pelayanan masyarakat.",
    rab: "Rp 250.000.000",
    duration: "4 bulan"
  },
  {
    id: 3,
    name: "Pembangunan Jembatan",
    location: "Dusun Batu",
    status: "Tertunda",
    progress: 30,
    image: "/images/jembatan.jpg",
    description: "Pembangunan jembatan penghubung antar desa yang masih menunggu pendanaan.",
    rab: "Rp 750.000.000",
    duration: "1 tahun"
  }
];

const ProyekPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-16"
      >
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">Daftar Proyek</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={project.image} alt={project.name} width={500} height={300} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{project.name}</h3>
                <p className="text-gray-600 mt-2">📍 {project.location}</p>
                <span
                  className={`inline-block px-4 py-1 mt-3 text-white rounded-full ${
                    project.status === "Selesai" ? "bg-green-500" :
                    project.status === "Sedang Berjalan" ? "bg-blue-500" : "bg-red-500"
                  }`}
                >
                  {project.status}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      project.status === "Selesai" ? "bg-green-500" :
                      project.status === "Sedang Berjalan" ? "bg-blue-500" : "bg-red-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Progres: {project.progress}%</p>
                <button
                  className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
                  onClick={() => setSelectedProject(project)}
                >
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal Detail Proyek */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative"
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
            <Image src={selectedProject.image} alt={selectedProject.name} width={500} height={300} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{selectedProject.name}</h2>
            <p className="text-gray-600 mt-2">📍 {selectedProject.location}</p>
            <p className="mt-4 text-gray-700">{selectedProject.description}</p>
            <p className="mt-2 font-semibold">💰 RAB: {selectedProject.rab}</p>
            <p className="mt-2 font-semibold">⏳ Durasi: {selectedProject.duration}</p>
            <span
              className={`inline-block px-4 py-1 mt-4 text-white rounded-full ${
                selectedProject.status === "Selesai" ? "bg-green-500" :
                selectedProject.status === "Sedang Berjalan" ? "bg-blue-500" : "bg-red-500"
              }`}
            >
              {selectedProject.status}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className={`h-2 rounded-full ${
                  selectedProject.status === "Selesai" ? "bg-green-500" :
                  selectedProject.status === "Sedang Berjalan" ? "bg-blue-500" : "bg-red-500"
                }`}
                style={{ width: `${selectedProject.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progres: {selectedProject.progress}%</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProyekPage;
