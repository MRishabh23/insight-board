import Link from "next/link";
import { SignOutComponent } from "./sign-out-component";
import { NavigationMenuComponent } from "./nav-menu";

const Header = () => {
  return (
    <header className="h-[70px] flex justify-between items-center px-4 border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl tracking-wide font-medium">
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
