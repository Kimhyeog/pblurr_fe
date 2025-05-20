"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import BodyWrapper from "@/components/BodyWrapper"; // 경로는 위치에 맞게 수정
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <BodyWrapper>{children}</BodyWrapper>
      </QueryClientProvider>
    </html>
  );
}
