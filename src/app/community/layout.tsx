"use client";

// src/app/community/layout.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import CMHeader from "./components/CMHeader";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const bgColor = pathname === "/community/login" ? "bg-pink-200" : "";
  return (
    <div className={`w-full flex justify-center ${bgColor}`}>
      <div className="w-[360px] sm:w-[1920px] mx-auto px-10 py-4 ">
        <QueryClientProvider client={queryClient}>
          <CMHeader />
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
}
