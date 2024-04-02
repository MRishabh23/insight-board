import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import QueryProviderWrapper from "@/custom-wrappers/queryProviderWrapper";

interface RootProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Multi-purpose Dashboard",
};

export default function RootLayout({ children }: Readonly<RootProps>) {
  return (
    <html lang="en">
      <body className={cn("w-full min-h-screen", inter.className)}>
        <QueryProviderWrapper>{children}</QueryProviderWrapper>
      </body>
    </html>
  );
}
