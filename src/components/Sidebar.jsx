import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px] overflow-scroll">
      <ul>
        <li className="p-3 m-3 text-xl border border-white/15 rounded-xl">
          Admin Kecamatan
        </li>
      </ul>
      <ul>
        <li className="m-6 pb-3 border-b border-black/15">Berita</li>
      </ul>
      <ul>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/read">Semua Berita</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/create">Buat Berita</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/update">Ubah Berita</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/delete">Hapus Berita</Link>
        </li>
      </ul>
      <ul>
        <li className="m-6 pb-3 border-b border-black/15">Laporan</li>
      </ul>
      <ul>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/read">Semua Laporan</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/berita/read">Review Laporan</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
