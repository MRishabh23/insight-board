"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";

export function NavigationMenuComponent() {
  const components: {
    title: string;
    path: string;
    description: string;
  }[] = [
    {
      title: "OCEAN",
      path: "/dashboard/tracking/ocean/prod/status",
      description: "Visit ocean dashboard to view metrics.",
    },
    {
      title: "AIR",
      path: "/dashboard/tracking/air/prod/status",
      description: "Visit air dashboard to view metrics.",
    },
    {
      title: "TERMINAL",
      path: "/dashboard/tracking/terminal/dev/status",
      description: "Visit terminal dashboard to view metrics.",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tracking</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <li key={component.title}>
                  <Link
                    href={component.path}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {component.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
          <Link
            href="/dashboard/profile"
            className={navigationMenuTriggerStyle()}
          >
            Profile
          </Link>
        </NavigationMenuItem>
        <Separator orientation="vertical" className="h-5 border-white" />
        <NavigationMenuItem>
          <Link
            href="/dashboard/issue"
            className={navigationMenuTriggerStyle()}
          >
            Issues
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
