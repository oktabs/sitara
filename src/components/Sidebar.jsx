"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Admin Kecamatan",
      items: [{ type: "header", content: "Admin Kecamatan" }],
    },
    {
      title: "Berita",
      items: [
        { type: "section", content: "Berita" },
        { type: "link", href: "/admin/berita/read", label: "Semua Berita" },
        { type: "link", href: "/admin/berita/create", label: "Buat Berita" },
        { type: "link", href: "/admin/berita/update", label: "Ubah Berita" },
        { type: "link", href: "/admin/berita/delete", label: "Hapus Berita" },
      ],
    },
    {
      title: "Laporan",
      items: [
        { type: "section", content: "Laporan" },
        { type: "link", href: "/", label: "Semua Laporan" },
        {
          type: "link",
          href: "/",
          label: "Review Laporan",
        },
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
      case "section":
        return (
          <li key={item.content} className="m-6 pb-3 border-b border-black/15">
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
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px] overflow-scroll">
      {menuItems.map((group, groupIndex) => (
        <ul key={groupIndex}>{group.items.map((item) => renderItem(item))}</ul>
      ))}
      <ul>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p>Proyek</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Semua Proyek (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Buat Proyek (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Ubah Proyek (Locked)</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl">
          <p>Hapus Proyek (Locked)</p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
