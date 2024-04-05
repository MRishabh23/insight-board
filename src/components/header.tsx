import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SettingsComponent from "./settings-component";

const Header = () => {
  return (
    <header className={cn("h-[70px] flex justify-center items-center mx-4 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-96 border-b")}>
      <div className={cn("w-full flex justify-between items-center")}>
        <h2 className="text-2xl tracking-wide font-medium">
          <Link href="/dashboard" className="">
            JUSTRANSFORM
          </Link>
        </h2>
        <SettingsComponent />
      </div>
    </header>
  );
};

export default React.memo(Header);
