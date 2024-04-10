import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SettingsComponent from "./settings-component";
import { NavigationMenuComponent } from "./nav-menu";

const Header = () => {
  return (
    <header
      className={cn("h-[70px] flex justify-between items-center px-4 border-b")}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-2xl tracking-wide font-medium">
          <Link href="/dashboard" className="block sm:hidden">
            JT
          </Link>
          <Link href="/dashboard" className="hidden sm:block">
            JUSTRANSFORM
          </Link>
        </h2>
        <NavigationMenuComponent/>
      </div>
      <SettingsComponent />
    </header>
  );
};

export default React.memo(Header);
