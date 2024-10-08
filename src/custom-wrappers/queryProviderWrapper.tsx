"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProviderWrapper({ children }: { children: React.ReactNode }) {
	const queryClient = React.useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			}),
		[],
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
