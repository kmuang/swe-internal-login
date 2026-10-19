import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northstar | Engineering Workspace",
  description: "Your engineering workspace for projects, priorities, and team updates."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
