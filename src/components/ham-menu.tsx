import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function HamburgerMenuComponent() {
	const trackingComponents: {
		title: string;
		path: string;
	}[] = [
		{
			title: "Ocean Dashboard",
			path: "/dashboard/tracking/ocean/prod/summary",
		},
		{
			title: "Air Dashboard",
			path: "/dashboard/tracking/air/prod/summary",
		},
		{
			title: "Terminal Dashboard",
			path: "/dashboard/tracking/terminal/dev/summary",
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
					<SheetTitle className="font-medium text-xl tracking-wide">
						<Link href="/dashboard">JUSTRANSFORM</Link>
					</SheetTitle>
				</SheetHeader>
				<div className="mt-5">
					<nav className="flex flex-col items-start justify-center gap-6 font-medium text-lg">
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
									href={{
										pathname: component.path,
										query: {
											carriers: "",
											queue: "NORMAL",
											from: "",
											to: "",
										},
									}}
									className="font-medium text-[14px] text-muted-foreground hover:text-foreground"
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
