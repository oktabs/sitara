import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const HalamanProgres = () => {
  const [proyek, setProyek] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ambilProyek = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProyek(response.data);
      } catch (err) {
        setError('Gagal mengambil data proyek');
        console.error('Error mengambil proyek:', err);
      } finally {
        setMemuat(false);
      }
    };

    ambilProyek();
  }, []);

  const formatMataUang = (jumlah) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(jumlah);
  };

  const formatTanggal = (tanggalString) => {
    return new Date(tanggalString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgresTerakhir = (progres) => {
    if (!progres || progres.length === 0) return null;
    return progres[progres.length - 1];
  };

  const getWarnaStatus = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const eksporKePDF = () => {
    const doc = new jsPDF();
    
    // Judul
    doc.setFontSize(18);
    doc.text('Laporan Progres Proyek', 14, 20);
    doc.setFontSize(12);
    doc.text(`Dibuat pada: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Setiap proyek sebagai halaman terpisah
    proyek.forEach((proyek, index) => {
      if (index > 0) {
        doc.addPage();
      }
      
      let posisiY = 40;
      
      // Header proyek
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 255);
      doc.text(proyek.name, 14, posisiY);
      posisiY += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Status: ${proyek.status}`, 14, posisiY);
      posisiY += 8;
      
      // Informasi dasar
      doc.text(`Lokasi: ${proyek.location.village}, ${proyek.location.district}`, 14, posisiY);
      posisiY += 8;
      doc.text(`Koordinat: Lat ${proyek.location.coordinates.lat}, Lng ${proyek.location.coordinates.lng}`, 14, posisiY);
      posisiY += 8;
      doc.text(`Kontraktor: ${proyek.contractor.name} (${proyek.contractor.contact})`, 14, posisiY);
      posisiY += 8;
      doc.text(`Deskripsi: ${proyek.description}`, 14, posisiY);
      posisiY += 12;
      
      // Tabel anggaran
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Informasi Anggaran:', 14, posisiY);
      posisiY += 8;
      
      const dataAnggaran = [
        ['Total Anggaran', formatMataUang(proyek.budget.totalBudget)],
        ['Tahun Anggaran', proyek.budget.fiscalYear],
        ['Sumber Dana', proyek.budget.fundingSource]
      ];
      
      doc.autoTable({
        startY: posisiY,
        head: [['Item', 'Nilai']],
        body: dataAnggaran,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        margin: { left: 14 }
      });
      
      posisiY = doc.lastAutoTable.finalY + 10;
      
      // Informasi progres
      const progresTerakhir = getProgresTerakhir(proyek.progress);
      if (progresTerakhir) {
        doc.text('Progres Terakhir:', 14, posisiY);
        posisiY += 8;
        
        doc.text(`Penyelesaian: ${progresTerakhir.percentage}%`, 14, posisiY);
        posisiY += 8;
        
        if (progresTerakhir.notes) {
          doc.text(`Catatan: ${progresTerakhir.notes}`, 14, posisiY);
          posisiY += 8;
        }
        
        doc.text(`Tanggal: ${formatTanggal(progresTerakhir.date)}`, 14, posisiY);
        posisiY += 12;
      }
      
      // Timeline
      doc.text('Jadwal:', 14, posisiY);
      posisiY += 8;
      
      const dataTimeline = [
        ['Tanggal Mulai', formatTanggal(proyek.startDate)],
        ['Tanggal Selesai', formatTanggal(proyek.endDate)],
        ['Dibuat', formatTanggal(proyek.createdAt)],
        ['Terakhir Diperbarui', formatTanggal(proyek.updatedAt)]
      ];
      
      doc.autoTable({
        startY: posisiY,
        body: dataTimeline,
        theme: 'grid',
        margin: { left: 14 }
      });
    });
    
    // Simpan PDF
    doc.save('laporan-progres-proyek.pdf');
  };

  if (memuat) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Memuat proyek...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Progres Proyek</h1>
          {proyek.length > 0 && (
            <button 
              onClick={eksporKePDF}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Ekspor ke PDF
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {proyek.map((proyek) => {
            const progresTerakhir = getProgresTerakhir(proyek.progress);
            
            return (
              <div key={proyek._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-black line-clamp-2">
                      {proyek.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWarnaStatus(proyek.status)}`}>
                      {proyek.status}
                    </span>
                  </div>
                  
                  <p className="text-black text-sm mb-4 line-clamp-3">
                    {proyek.description}
                  </p>
                  
                  {/* Informasi Dasar */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium text-black">Lokasi:</span>
                      <div className="ml-2 text-black">
                        <div>{proyek.location.village}, {proyek.location.district}</div>
                        <div className="text-xs">
                          Lat: {proyek.location.coordinates.lat}, Lng: {proyek.location.coordinates.lng}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-black">Kontraktor:</span>
                      <div className="ml-2 text-black">
                        <div>{proyek.contractor.name}</div>
                        <div className="text-xs">{proyek.contractor.contact}</div>
                        <div className="text-xs">{proyek.contractor.address}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bagian Anggaran */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-black mb-2">Informasi Anggaran</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">Total Anggaran:</span>
                        <span className="font-medium text-black">{formatMataUang(proyek.budget.totalBudget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Tahun Anggaran:</span>
                        <span className="text-black">{proyek.budget.fiscalYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Sumber Dana:</span>
                        <span className="text-black">{proyek.budget.fundingSource}</span>
                      </div>
                    </div>
                    
                    {/* Item Anggaran */}
                    {proyek.budget.items && proyek.budget.items.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-xs font-medium text-black mb-2">Item Anggaran:</h5>
                        <div className="space-y-1">
                          {proyek.budget.items.slice(0, 3).map((item) => (
                            <div key={item._id} className="text-xs text-black">
                              {item.description}: {item.volume} {item.unit} × {formatMataUang(item.unitPrice)}
                            </div>
                          ))}
                          {proyek.budget.items.length > 3 && (
                            <div className="text-xs text-black">
                              +{proyek.budget.items.length - 3} item lainnya
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bagian Progres */}
                  {proyek.progress && proyek.progress.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-black mb-2">Riwayat Progres</h4>
                      {progresTerakhir && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-black">Progres Terakhir</span>
                            <span className="text-sm font-bold text-blue-600">{progresTerakhir.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progresTerakhir.percentage}%` }}
                            ></div>
                          </div>
                          {progresTerakhir.notes && (
                            <p className="text-xs text-black mt-2 line-clamp-2">
                              {progresTerakhir.notes}
                            </p>
                          )}
                          <p className="text-xs text-black mt-1">
                            Diperbarui: {formatTanggal(progresTerakhir.date)}
                          </p>
                        </div>
                      )}
                      
                      {/* Riwayat Progres */}
                      <div className="text-xs text-black space-y-1">
                        <div>Total Pembaruan Progres: {proyek.progress.length}</div>
                        {proyek.progress.length > 1 && (
                          <div>Sebelumnya: {proyek.progress[proyek.progress.length - 2]?.percentage}%</div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Bagian Berita */}
                  {proyek.news && proyek.news.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-black mb-2">Berita Terbaru</h4>
                      <div className="space-y-2">
                        {proyek.news.slice(0, 2).map((berita) => (
                          <div key={berita._id} className="text-sm">
                            <h5 className="font-medium text-black line-clamp-1">{berita.title}</h5>
                            <p className="text-black text-xs line-clamp-2">{berita.content}</p>
                            <p className="text-black text-xs mt-1">
                              {formatTanggal(berita.createdAt)}
                            </p>
                          </div>
                        ))}
                        {proyek.news.length > 2 && (
                          <div className="text-xs text-black">
                            +{proyek.news.length - 2} berita lainnya
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Timeline */}
                  <div className="border-t pt-4">
                    <div className="space-y-1 text-xs text-black">
                      <div className="flex justify-between">
                        <span>Tanggal Mulai:</span>
                        <span>{formatTanggal(proyek.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tanggal Selesai:</span>
                        <span>{formatTanggal(proyek.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dibuat:</span>
                        <span>{formatTanggal(proyek.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terakhir Diperbarui:</span>
                        <span>{formatTanggal(proyek.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ID Proyek */}
                  <div className="mt-3 pt-2 border-t">
                    <div className="text-xs text-black">
                      ID: {proyek._id}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {proyek.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black">Tidak ada proyek ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HalamanProgres;