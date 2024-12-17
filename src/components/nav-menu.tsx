"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function NavigationMenuComponent() {
	const components: {
		title: string;
		path: string;
		description: string;
	}[] = [
		{
			title: "OCEAN",
			path: "/dashboard/tracking/ocean/prod/summary",
			description: "Visit ocean dashboard to view metrics.",
		},
		{
			title: "AIR",
			path: "/dashboard/tracking/air/prod/summary",
			description: "Visit air dashboard to view metrics.",
		},
		{
			title: "TERMINAL",
			path: "/dashboard/tracking/terminal/prod/summary",
			description: "Visit terminal dashboard to view metrics.",
		},
		{
			title: "ROAD",
			path: "/dashboard/tracking/road/dev/summary",
			description: "Visit road dashboard to view metrics.",
		}
	];

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Tracking</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{components.map((component) => (
								<li key={component.title}>
									<Link
										href={{
											pathname: component.path,
											query: {
												carriers: "",
												queue: "NORMAL",
												from: "",
												to: "",
											},
										}}
										className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
									>
										<div className="font-medium text-sm leading-none">{component.title}</div>
										<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
											{component.description}
										</p>
									</Link>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<Separator orientation="vertical" className="h-5 border-white" />
				<NavigationMenuItem>
					<Link href="/dashboard/issue" className={navigationMenuTriggerStyle()}>
						Issues
					</Link>
				</NavigationMenuItem>
				<Separator orientation="vertical" className="h-5 border-white" />
				<NavigationMenuItem>
					<Link href="/dashboard/profile" className={navigationMenuTriggerStyle()}>
						Profile
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
