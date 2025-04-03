import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const CardNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/utilities/news");
        setNews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {news.map((item) => (
        <div key={item.id} className="border rounded-3xl overflow-hidden bg-white text-black">
          <img src={item.foto} alt={item.judul} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{item.judul}</h2>
            <p className="text-sm text-black mb-2">{new Date(item.tanggal_dibuat).toLocaleDateString()}</p>
            <p className="text-black mb-2">{item.isi.substring(0, 100)}...</p>
            <div className="w-full flex justify-center">
              <Link href={`/berita/${item.id}`} className="p-3 text-center w-full rounded-full border border-black/15">
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNews;
