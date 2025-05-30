import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const menuItems = [
  { title: "Projects", href: "/projects", icon: "mdi:hammer-wrench" },
  {
    title: "All Projects",
    href: "/projects/all",
    icon: "mdi:clipboard-list-outline",
  },
  { title: "Budget", href: "/budget", icon: "mdi:currency-usd" },
  { title: "Progress", href: "/progress", icon: "mdi:progress-check" },
  { title: "News", href: "/", icon: "mdi:newspaper" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 relative">
        {/* Hamburger (Mobile) */}
        <div className="flex justify-between items-center md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <Icon
              icon={isOpen ? "mdi:close" : "mdi:menu"}
              width="24"
              height="24"
            />
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`w-full md:flex md:items-center justify-center absolute md:static top-8 left-0 bg-gray-800 md:bg-transparent z-50 md:z-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row justify-center items-center md:space-x-6 px-4 md:px-0 py-4 md:py-0">
            {menuItems.map(({ title, href, icon }) => {
              const isActive = router.pathname === href;
              return (
                <li key={title}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-center transition-all ${
                      isActive
                        ? "bg-gray-700 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon icon={icon} width="20" height="20" />
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
