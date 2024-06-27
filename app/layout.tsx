import type { Metadata } from "next";

import "./globals.css";
import  { Toaster } from 'react-hot-toast';




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className="bg-secondary">
      {children}
      <Toaster/>
      </body>
    </html>
  );
}
