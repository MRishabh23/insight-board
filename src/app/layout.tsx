import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import QueryProviderWrapper from "@/custom-wrappers/queryProviderWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { NextUIProvider } from "@nextui-org/react";

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
    <QueryProviderWrapper>
      <html className="max-w-[1400px] mx-auto h-screen" lang="en">
        <body className={cn("h-full", inter.className)}>
          <NextUIProvider style={{height: "100%"}}>
            {children}
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </NextUIProvider>
        </body>
      </html>
    </QueryProviderWrapper>
  );
}
