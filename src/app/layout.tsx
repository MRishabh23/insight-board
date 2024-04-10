import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import QueryProviderWrapper from "@/custom-wrappers/queryProviderWrapper";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/toaster";

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
    <html className="max-w-[1400px] mx-auto min-h-screen" lang="en">
      <body className={cn("h-screen", inter.className)}>
        <QueryProviderWrapper>
          {children}
          <Toaster/>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
