"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const KontraktorSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Kontraktor Desa",
      items: [{ type: "header", content: "Kontraktor Desa" }],
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
            className="p-3 m-3 text-xl border border-white/15 rounded-xl text-start"
          >
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
    <nav className="fixed top-0 left-0 bottom-0 text-black w-[200px] overflow-scroll bg-black/5">
      {menuItems.map((group, groupIndex) => (
        <ul key={groupIndex}>
          {group.items.map((item) => renderItem(item))}
        </ul>
      ))}
      <ul>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p className="mr-4">Berita</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Semua Berita</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Buat Berita</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Ubah Berita</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Hapus Berita</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb border-b border-black/15 rounded-xl">
          <p className="mr-4">Laporan</p>
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Semua Laporan</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
        <li className="p-3 m-3 mb rounded-xl flex items-center justify-between">
          <p className="mr-4">Review Laporan</p>
          <Icon icon="mdi:lock" width="20" height="20" />
        </li>
      </ul>
    </nav>
  );
};

export default KontraktorSidebar;
