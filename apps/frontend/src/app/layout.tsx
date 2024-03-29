import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "A Star Wars Codex",
  description: "Information about star wars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body data-theme={"dark"}>
        <Header />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
