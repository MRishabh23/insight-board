import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LiaLongArrowAltRightSolid, LiaShipSolid, LiaShippingFastSolid } from "react-icons/lia";
import { PiAirplaneTilt } from "react-icons/pi";

const Dashboard = () => {
	const modeList = [
		{
			mode: "ocean",
			env: "prod",
		},
		{
			mode: "air",
			env: "prod",
		},
		{
			mode: "terminal",
			env: "dev",
		},
	];
	return (
		<div className="flex h-full flex-col items-center justify-center px-6">
			<Card className="w-[350px]">
				<CardHeader className="border-b">
					<CardTitle>Tracking</CardTitle>
					<CardDescription>To view data insights/metrics.</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4 p-3">
					{modeList.map((item) => (
						<Link
							key={item.mode}
							href={{
								pathname: `/dashboard/tracking/${item.mode}/${item.env}/summary`,
								query: {
									carriers: "",
									queue: "NORMAL",
									from: "",
									to: "",
								},
							}}
						>
							<div className="flex items-center justify-between rounded-full border p-4 hover:bg-primary hover:text-primary-foreground">
								<div className="flex items-center">
									{item.mode === "ocean" ? (
										<LiaShipSolid className="text-xl" />
									) : item.mode === "air" ? (
										<PiAirplaneTilt className="text-xl" />
									) : (
										<LiaShippingFastSolid className="text-xl" />
									)}
									<p className="ml-2 text-lg">{item.mode.toUpperCase()}</p>
								</div>
								<LiaLongArrowAltRightSolid className="font-bold text-2xl" />
							</div>
						</Link>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
