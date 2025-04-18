import Head from "next/head";
// import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const BerandaPage = () => {
  return (
    <>
      <Head>
        <title>SITARA</title>
      </Head>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-center text-white px-6"
          style={{ backgroundImage: "url('/image.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold drop-shadow-lg animate-fade-in">
              Selamat Datang di SITARA
            </h1>
            <p className="text-xl mt-4 opacity-90 animate-slide-up">
              Sistem Pemantauan Pembangunan Kecamatan
            </p>
            <motion.a
              href="#tentang"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 transition duration-300 text-white px-8 py-4 rounded-full text-lg shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              Pelajari Lebih Lanjut
            </motion.a>
          </motion.div>
        </section>

        {/* Tentang SITARA */}
        <section
          id="tentang"
          className="container mx-auto px-6 py-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800">Apa itu SITARA?</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            SITARA adalah platform untuk mengelola, merencanakan, dan memantau
            pembangunan kecamatan secara transparan dan real-time.
          </p>
        </section>

        {/* Statistik dengan animasi */}
        <section className="bg-gray-100 py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            Dampak SITARA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                value: "100+",
                label: "Proyek Terpantau",
                color: "text-blue-600",
              },
              {
                value: "5000+",
                label: "Masyarakat Terbantu",
                color: "text-green-500",
              },
              {
                value: "98%",
                label: "Tingkat Kepercayaan",
                color: "text-gray-700",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.color} text-5xl font-bold`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              >
                {item.value}
                <p className="text-gray-600 text-lg mt-2">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fitur Utama */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
            Fitur Utama
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "📊 Dashboard Real-Time",
              "🗺️ Peta Interaktif",
              "📄 Laporan Transparan",
              "📢 Notifikasi Update",
              "💬 Forum Masyarakat",
              "📅 Jadwal Proyek",
            ].map((fitur, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg hover:shadow-2xl p-6 rounded-lg text-center border-t-4 border-blue-600"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold text-blue-600">{fitur}</h3>
                <p className="text-gray-600 mt-2">
                  Fitur canggih untuk memudahkan pemantauan proyek.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-16">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Mulai Gunakan SITARA Sekarang!
          </motion.h2>
          <p className="text-lg mt-4 opacity-90">
            Daftar dan pantau perkembangan pembangunan dengan lebih mudah.
          </p>
          <motion.a
            href="/register"
            className="mt-6 inline-block bg-white text-blue-600 font-semibold hover:bg-gray-200 transition duration-300 px-8 py-4 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Daftar Sekarang
          </motion.a>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white text-center py-10 px-6">
          <div className="container mx-auto grid md:grid-cols-3 gap-8 text-left">
            {/* Logo & Deskripsi */}
            <div>
              <h3 className="text-2xl font-bold">SITARA</h3>
              <p className="mt-2 text-gray-300 text-sm">
                Sistem Pemantauan Pembangunan Kecamatan Antang Kalang,
                memberikan transparansi dalam pembangunan dan fasilitas publik.
              </p>
            </div>

            {/* Navigasi Cepat */}
            <div>
              <h4 className="text-xl font-semibold">Navigasi</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#tentang" className="hover:text-gray-400">
                    Tentang SITARA
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-gray-400">
                    Fitur Utama
                  </a>
                </li>
                <li>
                  <a href="#kontak" className="hover:text-gray-400">
                    Kontak Kami
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-gray-400">
                    Daftar
                  </a>
                </li>
              </ul>
            </div>

            {/* Kontak & Sosial Media */}
            <div>
              <h4 className="text-xl font-semibold">Kontak Kami</h4>
              <p className="mt-2 text-gray-300 text-sm">
                Email: info@sitara.id
              </p>
              <p className="text-gray-300 text-sm">
                Telepon: +62 812-3456-7890
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-gray-400">
                  🔵 Facebook
                </a>
                <a href="#" className="hover:text-gray-400">
                  🔷 Twitter
                </a>
                <a href="#" className="hover:text-gray-400">
                  📸 Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-sm opacity-75">
              © 2024 SITARA. Semua Hak Dilindungi.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BerandaPage;
