import type { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "RBDG Reference App",
  description: "App for testing and demoing the exported module for React Bootstrap Data Grid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
