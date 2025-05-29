import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const menuItems = [
  { title: "Berita", href: "/berita", icon: "mdi:newspaper" },
  { title: "Proyek", href: "/proyek", icon: "mdi:hammer-wrench" },
  { title: "Budget", href: "/budget", icon: "mdi:currency-usd" },
  { title: "Progress", href: "/progress", icon: "mdi:progress-check" },
  { title: "Lokasi", href: "/lokasi", icon: "mdi:map-marker" },
  { title: "Kontraktor", href: "/kontraktor", icon: "mdi:account-tie" },
];

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-center">
        {/* Hamburger button mobile */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <Icon icon="mdi:close" width="24" height="24" />
          ) : (
            <Icon icon="mdi:menu" width="24" height="24" />
          )}
        </button>

        {/* Menu utama */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center w-full md:w-auto md:space-x-6 ${
            isOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {menuItems.map(({ title, href, icon }) => {
            const isActive = router.pathname === href;

            return (
              <Link
                key={title}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded text-center md:inline-flex md:text-left
                  ${
                    isActive
                      ? "bg-gray-700 text-white font-semibold"
                      : "text-white hover:bg-gray-700"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon icon={icon} width="20" height="20" />
                {title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
