import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReferIn",
  description: "ReferIn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-satoshi antialiased">
        <main className="min-h-screen max-w-[1920px] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
