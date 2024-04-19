"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const TrackingEnvHeader = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  const row1 = ["PROD", "DEV"];
  const [tabVal, setTabVal] = React.useState(params.env);

  return (
    <>
      <div
        className={cn("flex justify-between sm:justify-around items-center")}
      >
        <h2 className={cn("text-xl tracking-wider font-semibold")}>
          Shipment/AWB Tracking
        </h2>
        <Tabs
          value={tabVal}
          onValueChange={(value) => {
            setTabVal(value);
          }}
        >
          <TabsList className="grid grid-cols-2">
            {row1.map((tab) => (
              <Link
                key={tab}
                href={`/dashboard/tracking/${
                  params.mode
                }/${tab.toLowerCase()}/${params.dash}`}
              >
                <TabsTrigger value={tab.toLowerCase()} className="w-full">
                  {tab}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default TrackingEnvHeader;
