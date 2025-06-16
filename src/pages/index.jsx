import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>SITARA</title>
      </Head>
      <div>
        {/* Navbar */}
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
          <div className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  SITARA
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="#tentang"
                  className="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  Tentang
                </Link>
                <Link
                  href="#fitur"
                  className="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  Fitur
                </Link>
                <Link
                  href="#kontak"
                  className="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  Kontak
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300"
                >
                  Login
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Link
                  href="/auth/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-center text-white px-6 mt-16"
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
        
        {/* Footer */}
        <footer className="bg-blue-900 text-white text-center py-10 px-6">
          <div className="container mx-auto grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-2xl font-bold">SITARA</h3>
              <p className="mt-2 text-gray-300 text-sm">
                Sistem Pemantauan Pembangunan Kecamatan Antang Kalang,
                memberikan transparansi dalam pembangunan dan fasilitas publik.
              </p>
            </div>

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

export default HomePage;
