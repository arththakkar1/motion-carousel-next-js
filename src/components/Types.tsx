"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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
    label: "Playlist",
    link: "/playlist",
  },
];

export function Types() {
  const pathname = usePathname();

  return (
    <div className="w-full h-auto mt-7 mb-5 flex flex-wrap justify-center items-center gap-3">
      {types.map((item) => {
        const isActive = pathname === item.link;

        return (
          <Link
            key={item.link}
            className={`relative p-3 font-semibold px-8 font-sans rounded-full transition-all duration-300 ${
              isActive
                ? "bg-white/80 text-black shadow-lg shadow-slate-950/50 scale-105"
                : "bg-white/90 text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
            }`}
            href={item.link}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
