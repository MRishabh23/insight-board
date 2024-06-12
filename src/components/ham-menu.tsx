import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function HamburgerMenuComponent() {
  const trackingComponents: {
    title: string;
    path: string;
  }[] = [
    {
      title: "Ocean Dashboard",
      path: "/dashboard/tracking/ocean/prod/status",
    },
    {
      title: "Air Dashboard",
      path: "/dashboard/tracking/air/prod/status",
    },
    {
      title: "Terminal Dashboard",
      path: "/dashboard/tracking/terminal/dev/status",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium tracking-wide">
            <Link href="/dashboard">JUSTRANSFORM</Link>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-5">
          <nav className="flex flex-col items-start justify-center gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link href="/dashboard/profile" className="text-muted-foreground hover:text-foreground">
                Profile
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/dashboard/issue" className="text-muted-foreground hover:text-foreground">
                Issues
              </Link>
            </SheetClose>
            <PopoverMenu components={trackingComponents} />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PopoverMenu({ ...props }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-7 bg-white p-0 text-lg text-muted-foreground hover:bg-white hover:text-foreground">
          Tracking
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" side="right">
        <ul className="flex flex-col gap-5 p-1">
          {props.components.map((component: any) => (
            <li key={component.title}>
              <SheetClose asChild>
                <Link
                  href={component.path}
                  className="text-[14px] font-medium text-muted-foreground hover:text-foreground"
                >
                  {component.title}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
