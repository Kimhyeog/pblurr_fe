// src/app/community/layout.tsx

import { ReactNode } from "react";
import CMHeader from "./components/CMHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[360px] sm:w-[1920px] mx-auto px-10 py-4 ">
        <CMHeader />
        {children}
      </div>
    </div>
  );
}
