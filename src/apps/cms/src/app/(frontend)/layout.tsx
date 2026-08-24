import { Metadata } from "next";
import React from "react";
import "./styles.css";

export const metadata: Metadata = {
  description: "Homepage of the CMS of Allon de Veen's portfolio.",
  title: "CMS Homepage | Allon de Veen",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
