import Link from "next/link";
import { SignOutComponent } from "./sign-out-component";
import { NavigationMenuComponent } from "./nav-menu";
import { HamburgerMenuComponent } from "./ham-menu";

const Header = () => {
  return (
    <header className="flex h-[70px] items-center justify-between border-b px-4">
      <div className="hidden items-center gap-4 md:flex">
        <h2 className="text-2xl font-medium tracking-wide">
          <Link href="/dashboard">JUSTRANSFORM</Link>
        </h2>
        <NavigationMenuComponent />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <HamburgerMenuComponent />
        <h2 className="text-2xl font-medium tracking-wide">
          <Link href="/dashboard" className="hidden sm:block">
            JUSTRANSFORM
          </Link>
          <Link href="/dashboard" className="block sm:hidden">
            JT
          </Link>
        </h2>
      </div>
      <SignOutComponent />
    </header>
  );
};

export default Header;
