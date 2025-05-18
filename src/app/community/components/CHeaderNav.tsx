"use client";

import Link from "next/link";
import clsx from "clsx";

function CHeaderNav() {
  const navItems = [
    { name: "메인 페이지", href: "/" },
    { name: "이준민 일기장(유료)", href: "/community" },
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
