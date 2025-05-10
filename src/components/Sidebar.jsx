"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

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
  ];

  const renderItem = (item) => {
    switch (item.type) {
      case "header":
        return (
          <li
            key={item.content}
            className="p-3 m-3 text-xl border border-white/15 rounded-xl text-center"
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
            className={`p-3 m-3 border rounded-full ${
              isActive
                ? "bg-blue-500 text-white"
                : "border-white/15 hover:bg-blue-500 hover:text-white"
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
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px]">
      {menuItems.map((group, groupIndex) => (
        <ul key={groupIndex}>{group.items.map((item) => renderItem(item))}</ul>
      ))}
      <ul>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p className="mr-4">Proyek</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Semua Proyek</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Buat Proyek</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Ubah Proyek</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Hapus Proyek</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
