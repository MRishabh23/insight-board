"use client";

import React from "react";
import { cn } from "@/lib/utils";
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
  const modeList = ["ocean", "air", "terminal"];
  return (
    <div
      className={cn("h-full px-6 flex flex-col justify-center items-center")}
    >
      <Card className="w-[350px]">
        <CardHeader className="border-b">
          <CardTitle>Tracking Dashboards</CardTitle>
          <CardDescription>To view data insights/metrics.</CardDescription>
        </CardHeader>
        <CardContent className="p-3 flex flex-col gap-4">
          {modeList.map((item) => (
            <Link
              key={item}
              href={`/dashboard/tracking/${item}/prod?dash=status`}
            >
              <div className="flex justify-between items-center border rounded-full p-4 hover:bg-primary hover:text-primary-foreground">
                <div className="flex items-center">
                  {item === "ocean" ? (
                    <LiaShipSolid className="text-xl" />
                  ) : item === "air" ? (
                    <PiAirplaneTilt className="text-xl" />
                  ) : (
                    <LiaShippingFastSolid className="text-xl" />
                  )}
                  <p className="ml-2 text-lg">{item.toUpperCase()}</p>
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
