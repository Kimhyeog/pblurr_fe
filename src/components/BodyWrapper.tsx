"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/signup";

  return (
    <body className={isLogin ? "bg-[#E3F2FD] " : "bg-[#F7F6F9]"}>
      {children}
    </body>
  );
}

// #8fc1d5f8
