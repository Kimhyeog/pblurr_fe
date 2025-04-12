import "./globals.css";
import BodyWrapper from "@/components/BodyWrapper"; // 경로는 위치에 맞게 수정

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BodyWrapper>{children}</BodyWrapper>
    </html>
  );
}
