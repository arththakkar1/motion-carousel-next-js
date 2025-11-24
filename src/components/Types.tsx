"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const types = [
  {
    label: "Base",
    link: "/",
  },
  {
    label: "Peek a boo",
    link: "/peek-a-boo",
  },
  {
    label: "Infinite Loop",
    link: "/infinite-loop",
  },
  {
    label: "Insta Slide",
    link: "/insta-slide",
  },
  {
    label: "Playlist",
    link: "/playlist",
  },
  {
    label: "Instagram",
    link: "/instagram",
  },
];

export function Types() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const MenuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );

  const CloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );

  return (
    <nav className="fixed top-6 z-50 w-[96%] left-[2%] right-[2%] md:w-fit md:left-1/2 md:-translate-x-1/2">
      <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl flex items-center justify-between md:justify-center">
        <ul className="hidden md:flex items-center gap-1">
          {types.map((item) => {
            const isActive =
              pathname === item.link || (item.link === "/" && pathname === "/");
            return (
              <motion.li
                key={item.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.link}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium
                    transition-colors duration-300 ease-out
                    block whitespace-nowrap z-10
                    ${
                      isActive ? "text-black" : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 z-[-1] rounded-full bg-white shadow-lg shadow-white/20"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.5,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="text-white md:hidden font-semibold px-4"></div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? CloseIcon : MenuIcon}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mt-2 p-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl w-full"
        >
          <ul className="flex flex-col gap-1">
            {types.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.link === "/" && pathname === "/");
              return (
                <motion.li
                  key={`mobile-${item.link}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.link}
                    onClick={handleLinkClick}
                    className={`
                      relative px-4 py-3 rounded-lg text-base font-medium w-full text-left
                      block transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "bg-white text-black shadow-lg shadow-white/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
