import Navbar from "@/components/global/Navbar";
import Berita from "@/components/Berita";

const BeritaPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-5xl mt-20 text-black">Berita</h1>
            <Berita />
        </div>
    )
}

export default BeritaPage;