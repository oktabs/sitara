import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/global/Navbar";

const DetailBerita = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/api/berita`);
        const selectedNews = response.data.find((item) => item._id == id);

        if (selectedNews) {
          setNewsDetail(selectedNews);
        } else {
          setError("Berita tidak ditemukan");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div className="mt-20 max-w-3xl mx-auto p-6">
        <img
          src={newsDetail.foto}
          alt={newsDetail.judul}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{newsDetail.judul}</h1>
        <p className="text-gray-600 mb-2">
          {new Date(newsDetail.tanggal_dibuat).toLocaleDateString()}
        </p>
        <p className="text-black mb-4">{newsDetail.isi}</p>
        <p className="text-sm font-semibold">By: {newsDetail.penulis}</p>
        <Link href="/berita" className="text-blue-600 font-semibold mt-4 block">
          ← Kembali ke Berita
        </Link>
      </div>
    </div>
  );
};

export default DetailBerita;
