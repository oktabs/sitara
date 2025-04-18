import Link from "next/link";

const KontraktorSidebar = () => {
  return (
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px] overflow-scroll">
      <ul>
        <li className="p-3 m-3 text-xl border border-white/15 rounded-xl">
          Kontraktor Desa
        </li>
      </ul>
      <ul>
        <li className="p-3 m-3 border border-black/15 rounded-xl">
          <Link href="/admin/projek/read">Semua Projek</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/projek/create">Buat Projek</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/projek/update">Ubah Projek</Link>
        </li>
        <li className="p-3 m-3 border border-white/15 hover:border-black/15 rounded-xl">
          <Link href="/admin/projek/delete">Hapus Projek</Link>
        </li>
      </ul>
    </nav>
  );
};

export default KontraktorSidebar;
