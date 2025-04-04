"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <body className={isLogin ? "bg-[#bfe0eef8] " : "bg-white"}>{children}</body>
  );
}

// #8fc1d5f8
