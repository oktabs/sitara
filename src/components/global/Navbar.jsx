import Link from "next/link";
import ProtectedImage from "../utilities/ProtectedImage";

const Navbar = () => {
    return (
        <div className="z-50 fixed top-5 left-0 right-0 flex items-center justify-center">
            <nav className="flex w-fit bg-white/50 backdrop-blur rounded-full">
                <ul className="flex justify-center items-center text-black/75">
                    <li className="w-16">
                        <ProtectedImage
                            src="/logo.png"
                            alt="Logo"
                            className="w-full h-16 rounded-full"
                        />
                    </li>
                    <li className="ml-3 mr-3">
                        <Link className="text-xs" href="/">Beranda</Link>
                    </li>
                    <li className="ml-3 mr-3">
                        <Link className="text-xs" href="/proyek">Proyek</Link>
                    </li>
                    <li className="ml-3 mr-3">
                        <Link className="text-xs" href="/berita">Berita</Link>
                    </li>
                    <li className="px-3 py-2 mr-3 bg-white rounded-xl">
                        <Link className="text-xs" href="/berita">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;