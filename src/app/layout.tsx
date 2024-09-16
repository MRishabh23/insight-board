import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProviderWrapper from "@/custom-wrappers/queryProviderWrapper";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

interface RootProps {
	children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JT TRACKING",
	description: "Multi-purpose Dashboard!",
};

const RootLayout: React.FC<RootProps> = ({ children }) => (
	<html className="mx-auto h-screen max-w-screen" lang="en">
		<body className={cn("h-full", inter.className)}>
			<QueryProviderWrapper>
				{children}
				<Toaster />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryProviderWrapper>
		</body>
	</html>
);

export default React.memo(RootLayout);
