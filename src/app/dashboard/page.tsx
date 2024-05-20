import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  LiaShipSolid,
  LiaShippingFastSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
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
    <div className="h-full px-6 flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="border-b">
          <CardTitle>Tracking</CardTitle>
          <CardDescription>To view data insights/metrics.</CardDescription>
        </CardHeader>
        <CardContent className="p-3 flex flex-col gap-4">
          {modeList.map((item) => (
            <Link
              key={item.mode}
              href={{
                pathname: `/dashboard/tracking/${item.mode}/${item.env}/status`,
              }}
            >
              <div className="flex justify-between items-center border rounded-full p-4 hover:bg-primary hover:text-primary-foreground">
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
                <LiaLongArrowAltRightSolid className="text-2xl font-bold" />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
