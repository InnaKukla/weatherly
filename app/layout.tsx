import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Weatherly",
  description: "The weather site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f2f6fc]">
        {children}
      </body>
    </html>
  );
}
