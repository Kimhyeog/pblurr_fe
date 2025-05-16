"use client";

import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div
      className="w-full
    "
    >
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        {children}
      </QueryClientProvider>
    </div>
  );
}
