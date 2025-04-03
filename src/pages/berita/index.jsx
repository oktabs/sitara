import Navbar from "@/components/global/Navbar";
import Berita from "@/components/berita/Berita";

const BeritaPage = () => {
    return (
        <div className="bg-gradient-to-br from-blue-100 to-white min-h-screen">
            <Navbar />
            <h1 className="text-3xl pt-28 text-black text-center">Berita Terkini</h1>
            <Berita />
        </div>
    )
}

export default BeritaPage;