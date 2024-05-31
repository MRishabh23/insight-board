import Link from "next/link";
import { SignOutComponent } from "./sign-out-component";
import { NavigationMenuComponent } from "./nav-menu";

const Header = () => {
  return (
    <header className="flex h-[70px] items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-medium tracking-wide">
          <Link href="/dashboard" className="block sm:hidden">
            JT
          </Link>
          <Link href="/dashboard" className="hidden sm:block">
            JUSTRANSFORM
          </Link>
        </h2>
        <NavigationMenuComponent />
      </div>
      <SignOutComponent />
    </header>
  );
};

export default Header;
