export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      name: "Pembangunan Jalan Desa",
      location: "Desa Kalang",
      status: "Selesai",
      progress: 100,
      image: "/thumb.png",
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
      image: "/thumb.png",
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
      image: "/thumb.png",
      description: "Pembangunan jembatan penghubung antar desa yang masih menunggu pendanaan.",
      rab: "Rp 750.000.000",
      duration: "1 tahun"
    }
  ]);
}
