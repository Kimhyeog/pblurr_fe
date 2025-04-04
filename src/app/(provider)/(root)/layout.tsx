import Header from "@/components/Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Header></Header>
      {children}
    </div>
  );
}
