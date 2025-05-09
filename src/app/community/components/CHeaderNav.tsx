"use client";

import Link from "next/link";
import clsx from "clsx";

function CHeaderNav() {
  const navItems = [
    { name: "피부 진단", href: "/" },
    { name: "커뮤니티", href: "/community" },
    { name: "인기글", href: "/about" },
  ];

  return (
    <nav className="flex-1 flex justify-start gap-6 p-4 bg-white">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx("text-lg text-gray-600 font-extrabold")}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default CHeaderNav;
