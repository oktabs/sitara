"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const KontraktorSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Kontraktor Dashboard",
      items: [{ type: "header", content: "Kontraktor Desa Dashboard" }],
    },
    {
      title: "Proyek",
      items: [
        { type: "link", href: "/admin/proyek/read", label: "Semua Projek" },
        { type: "link", href: "/admin/proyek/create", label: "Buat Projek" },
        { type: "link", href: "/admin/proyek/update", label: "Ubah Projek" },
        { type: "link", href: "/admin/proyek/delete", label: "Hapus Projek" },
      ],
    },
  ];

  const renderItem = (item) => {
    switch (item.type) {
      case "header":
        return (
          <li
            key={item.content}
            className="p-3 m-3 text-xl border border-white/15 rounded-xl"
          >
            {item.content}
          </li>
        );
      case "link":
        const isActive = pathname === item.href;
        return (
          <li
            key={item.href}
            className={`p-3 m-3 border rounded-xl ${
              isActive
                ? "border-black/15 bg-gray-100"
                : "border-white/15 hover:border-black/15"
            }`}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px] overflow-scroll bg-black/5">
      {menuItems.map((group, groupIndex) => (
        <ul key={groupIndex}>{group.items.map((item) => renderItem(item))}</ul>
      ))}
      <ul>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p>Berita</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Semua Berita (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Buat Berita (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Ubah Berita (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Hapus Berita (Locked)</p>
        </li>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p>Laporan</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Semua Laporan (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Review Laporan (Locked)</p>
        </li>
      </ul>
    </nav>
  );
};

export default KontraktorSidebar;
