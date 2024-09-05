import type { Metadata } from "next";
import { title } from "./const";

export const metadata: Metadata = {
  title,
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
