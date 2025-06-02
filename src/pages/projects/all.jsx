// src/pages/projects/all.jsx
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Icon } from "@iconify/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllProject = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    status: "",
    location: "",
    contractor: "",
    fundingSource: "",
    minBudget: "",
    maxBudget: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProjects = projects.filter((project) => {
    // Search term filter
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Apply all other filters
    const matchesYear = filters.year
      ? project.budget?.fiscalYear === filters.year
      : true;
    const matchesStatus = filters.status
      ? project.status === filters.status
      : true;
    const matchesLocation = filters.location
      ? project.location.district
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      : true;
    const matchesContractor = filters.contractor
      ? project.contractor.name
          .toLowerCase()
          .includes(filters.contractor.toLowerCase())
      : true;
    const matchesFunding = filters.fundingSource
      ? project.budget.fundingSource === filters.fundingSource
      : true;
    const matchesMinBudget = filters.minBudget
      ? project.budget.totalBudget >= Number(filters.minBudget)
      : true;
    const matchesMaxBudget = filters.maxBudget
      ? project.budget.totalBudget <= Number(filters.maxBudget)
      : true;

    return (
      matchesSearch &&
      matchesYear &&
      matchesStatus &&
      matchesLocation &&
      matchesContractor &&
      matchesFunding &&
      matchesMinBudget &&
      matchesMaxBudget
    );
  });

  const exportToPDF = (project) => {
    const doc = new jsPDF();
    // ... (same PDF generation code as before)
    doc.save(`${project.name}_RAB.pdf`);
  };

  // Get unique values for filters
  const uniqueYears = [
    ...new Set(projects.map((p) => p.budget?.fiscalYear)),
  ].filter(Boolean);
  const uniqueStatuses = [...new Set(projects.map((p) => p.status))].filter(
    Boolean,
  );
  const uniqueDistricts = [
    ...new Set(projects.map((p) => p.location.district)),
  ].filter(Boolean);
  const uniqueContractors = [
    ...new Set(projects.map((p) => p.contractor.name)),
  ].filter(Boolean);
  const uniqueFundingSources = [
    ...new Set(projects.map((p) => p.budget.fundingSource)),
  ].filter(Boolean);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="pt-28 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Daftar Proyek Lengkap & RAB
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Kelola dan ekspor data proyek konstruksi
          </p>

          {/* Search and Filter Controls */}
          <div className="space-y-4">
            <div className="relative">
              <Icon
                icon="heroicons:magnifying-glass-20-solid"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari nama proyek..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Icon
                  icon="heroicons:calendar-20-solid"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Tahun</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Icon
                  icon="heroicons:check-badge-20-solid"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Status</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:map-marker"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Lokasi</option>
                  {uniqueDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:account-hard-hat"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  name="contractor"
                  value={filters.contractor}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kontraktor</option>
                  {uniqueContractors.map((contractor) => (
                    <option key={contractor} value={contractor}>
                      {contractor}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Icon
                  icon="mdi:finance"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  name="fundingSource"
                  value={filters.fundingSource}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Sumber Dana</option>
                  {uniqueFundingSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:cash-remove"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="number"
                  name="minBudget"
                  placeholder="Min. Anggaran"
                  value={filters.minBudget}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:cash-plus"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="number"
                  name="maxBudget"
                  placeholder="Max. Anggaran"
                  value={filters.maxBudget}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project List */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <Skeleton height={30} width="60%" className="mb-4" />
                <Skeleton count={3} className="mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <Icon
              icon="mdi:file-search-outline"
              className="text-5xl text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-700">
              Tidak ada proyek yang ditemukan
            </h3>
            <p className="text-gray-500 mt-2">
              Coba ubah kriteria pencarian atau filter
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {project.name}
                    </h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <Icon icon="mdi:calendar" className="mr-1" />
                        {project.budget?.fiscalYear}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Dalam Proses"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        <Icon
                          icon={
                            project.status === "Selesai"
                              ? "mdi:check-circle"
                              : project.status === "Dalam Proses"
                                ? "mdi:progress-clock"
                                : "mdi:alert-circle"
                          }
                          className="mr-1"
                        />
                        {project.status}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <Icon icon="mdi:cash" className="mr-1" />
                        Rp{project.budget.totalBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => exportToPDF(project)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Icon icon="mdi:file-pdf-box" />
                    Export
                  </button>
                </div>

                <p className="text-gray-600 mb-6">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon icon="mdi:map-marker" className="text-blue-500" />
                      Lokasi
                    </h4>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:home" className="text-gray-400" />
                        Desa/Kel: {project.location.village}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:city" className="text-gray-400" />
                        Kecamatan: {project.location.district}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:map" className="text-gray-400" />
                        Koordinat: {project.location.coordinates.lat},{" "}
                        {project.location.coordinates.lng}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon
                        icon="mdi:account-hard-hat"
                        className="text-orange-500"
                      />
                      Kontraktor
                    </h4>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:account" className="text-gray-400" />
                        {project.contractor.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon
                          icon="mdi:home-outline"
                          className="text-gray-400"
                        />
                        {project.contractor.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:phone" className="text-gray-400" />
                        {project.contractor.contact}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon icon="mdi:finance" className="text-green-500" />
                      Anggaran
                    </h4>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center gap-2">
                        <Icon icon="mdi:bank" className="text-gray-400" />
                        Sumber: {project.budget.fundingSource}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon
                          icon="mdi:cash-multiple"
                          className="text-gray-400"
                        />
                        Total: Rp{project.budget.totalBudget.toLocaleString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <Icon
                          icon="mdi:calendar-range"
                          className="text-gray-400"
                        />
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Budget Items Table */}
                {project.budget.items.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon
                        icon="mdi:format-list-checks"
                        className="text-purple-500"
                      />
                      Rincian Anggaran
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border p-3 text-left">No</th>
                            <th className="border p-3 text-left">Deskripsi</th>
                            <th className="border p-3 text-center">Volume</th>
                            <th className="border p-3 text-center">Satuan</th>
                            <th className="border p-3 text-right">
                              Harga Satuan
                            </th>
                            <th className="border p-3 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.budget.items.map((item, i) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                              <td className="border p-3">{i + 1}</td>
                              <td className="border p-3">{item.description}</td>
                              <td className="border p-3 text-center">
                                {item.volume}
                              </td>
                              <td className="border p-3 text-center">
                                {item.unit}
                              </td>
                              <td className="border p-3 text-right">
                                Rp{item.unitPrice.toLocaleString()}
                              </td>
                              <td className="border p-3 text-right font-medium">
                                Rp{item.total.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Progress Section */}
                {project.progress.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon
                        icon="mdi:progress-check"
                        className="text-yellow-500"
                      />
                      Progress
                    </h4>
                    <div className="space-y-4">
                      {project.progress.map((p) => (
                        <div
                          key={p._id}
                          className="border-l-4 border-blue-500 pl-4 py-2"
                        >
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium">
                              {new Date(p.date).toLocaleDateString()} -{" "}
                              {p.percentage}%
                            </h5>
                            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${p.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {p.notes}
                          </p>
                          {p.photoDocumentation.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-3">
                              {p.photoDocumentation.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`Progress ${idx + 1}`}
                                  className="w-24 h-24 object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  onClick={() => window.open(url, "_blank")}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Section */}
                {project.news.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-700 mb-3">
                      <Icon icon="mdi:newspaper" className="text-red-500" />
                      Berita Terkait
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.news.map((n) => (
                        <div
                          key={n._id}
                          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <h5 className="font-bold text-lg mb-2">{n.title}</h5>
                          <p className="text-gray-600 mb-3">
                            {n.content.substring(0, 150)}...
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>
                              {new Date(n.createdAt).toLocaleDateString()}
                            </span>
                            {n.photo && (
                              <button
                                onClick={() => window.open(n.photo, "_blank")}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Icon icon="mdi:image" />
                                Lihat Foto
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-gray-500 mt-6 pt-4 border-t">
                  <span>
                    Dibuat: {new Date(project.createdAt).toLocaleString()}
                  </span>
                  <span>
                    Diperbarui: {new Date(project.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProject;
