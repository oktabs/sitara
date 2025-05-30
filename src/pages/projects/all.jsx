// src/pages/projects/all.jsx
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const AllProject = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterYearChange = (e) => setFilterYear(e.target.value);
  const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = filterYear
      ? project.budget?.fiscalYear === filterYear
      : true;
    const matchesStatus = filterStatus ? project.status === filterStatus : true;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const exportToPDF = (project) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(project.name, 10, 20);
    doc.setFontSize(12);
    doc.text(`Deskripsi: ${project.description}`, 10, 30);
    doc.text(
      `Lokasi: ${project.location.village}, ${project.location.district}`,
      10,
      40,
    );
    doc.text(
      `Koordinat: Lat ${project.location.coordinates.lat}, Lng ${project.location.coordinates.lng}`,
      10,
      50,
    );
    doc.text(
      `Kontraktor: ${project.contractor.name} - ${project.contractor.contact}`,
      10,
      60,
    );
    doc.text(
      `Tanggal: ${new Date(project.startDate).toLocaleDateString()} → ${new Date(project.endDate).toLocaleDateString()}`,
      10,
      70,
    );
    doc.text(`Status: ${project.status}`, 10, 80);
    doc.text(`Anggaran:`, 10, 90);
    doc.text(`- Tahun Anggaran: ${project.budget.fiscalYear}`, 15, 100);
    doc.text(`- Sumber Dana: ${project.budget.fundingSource}`, 15, 110);
    doc.text(
      `- Total: Rp${project.budget.totalBudget.toLocaleString()}`,
      15,
      120,
    );
    let y = 130;
    if (project.budget.items.length > 0) {
      doc.text("Rincian Item:", 15, y);
      y += 10;
      project.budget.items.forEach((item, idx) => {
        const itemText = `${idx + 1}. ${item.description} — ${item.volume} ${item.unit} @ Rp${item.unitPrice.toLocaleString()} = Rp${item.total.toLocaleString()}`;
        doc.text(itemText, 20, y);
        y += 10;
      });
    }
    doc.save(`${project.name}_RAB.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 w-full max-w-6xl mx-auto p-6 text-black/80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Daftar Proyek Lengkap
        </h2>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari nama proyek..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded"
          />
          <select
            value={filterYear}
            onChange={handleFilterYearChange}
            className="w-full md:w-1/4 px-4 py-2 border rounded"
          >
            <option value="">Tahun Anggaran</option>
            {[...new Set(projects.map((p) => p.budget?.fiscalYear))].map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ),
            )}
          </select>
          <select
            value={filterStatus}
            onChange={handleFilterStatusChange}
            className="w-full md:w-1/4 px-4 py-2 border rounded"
          >
            <option value="">Status Proyek</option>
            {[...new Set(projects.map((p) => p.status))].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Project List */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-600">
            Tidak ada proyek yang sesuai.
          </p>
        ) : (
          <div className="space-y-10">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p>{project.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">📍 Lokasi</h4>
                  <p>Desa / Kelurahan: {project.location.village}</p>
                  <p>Kecamatan: {project.location.district}</p>
                  <p>
                    Koordinat: Lat {project.location.coordinates.lat}, Lng{" "}
                    {project.location.coordinates.lng}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">🏗️ Kontraktor</h4>
                  <p>Nama: {project.contractor.name}</p>
                  <p>Alamat: {project.contractor.address}</p>
                  <p>Kontak: {project.contractor.contact}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">📅 Jadwal & Status</h4>
                  <p>
                    Mulai: {new Date(project.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    Selesai: {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  <p>Status: {project.status}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    💰 Rencana Anggaran Biaya (RAB)
                  </h4>
                  <p>Tahun Anggaran: {project.budget.fiscalYear}</p>
                  <p>Sumber Dana: {project.budget.fundingSource}</p>
                  <p>Total: Rp{project.budget.totalBudget.toLocaleString()}</p>

                  {project.budget.items.length > 0 && (
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border p-2">No</th>
                            <th className="border p-2 text-left">Deskripsi</th>
                            <th className="border p-2">Volume</th>
                            <th className="border p-2">Satuan</th>
                            <th className="border p-2">Harga Satuan</th>
                            <th className="border p-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.budget.items.map((item, i) => (
                            <tr key={item._id}>
                              <td className="border p-2 text-center">
                                {i + 1}
                              </td>
                              <td className="border p-2">{item.description}</td>
                              <td className="border p-2 text-center">
                                {item.volume}
                              </td>
                              <td className="border p-2 text-center">
                                {item.unit}
                              </td>
                              <td className="border p-2 text-right">
                                Rp{item.unitPrice.toLocaleString()}
                              </td>
                              <td className="border p-2 text-right">
                                Rp{item.total.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {project.progress.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg">📈 Progress</h4>
                    <ul className="list-disc pl-5 space-y-3">
                      {project.progress.map((p) => (
                        <li key={p._id}>
                          <p>
                            <strong>
                              {new Date(p.date).toLocaleDateString()}:
                            </strong>{" "}
                            {p.percentage}%
                          </p>
                          <p className="italic text-sm">{p.notes}</p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {p.photoDocumentation.map((url, idx) => (
                              <img
                                key={idx}
                                src={url}
                                alt="Progress"
                                className="w-32 h-auto rounded shadow"
                              />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.news.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg">📰 Berita</h4>
                    <div className="space-y-4">
                      {project.news.map((n) => (
                        <div
                          key={n._id}
                          className="border p-4 rounded shadow-sm"
                        >
                          <h5 className="font-bold text-lg">{n.title}</h5>
                          <p>{n.content}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                          {n.photo && (
                            <img
                              src={n.photo}
                              alt="News"
                              className="w-40 mt-2 rounded shadow"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  Dibuat: {new Date(project.createdAt).toLocaleString()} |
                  Diperbarui: {new Date(project.updatedAt).toLocaleString()}
                </p>

                <button
                  onClick={() => exportToPDF(project)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Export to PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProject;
