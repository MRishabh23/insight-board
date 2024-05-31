"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TrackingEnvHeader = ({ params }: { params: { mode: string; env: string; dash: string } }) => {
  let row1 = [];
  if (params.mode === "terminal") {
    row1 = ["DEV"];
  } else {
    row1 = ["PROD", "DEV"];
  }
  const searchParams = useSearchParams();
  const [tabVal, setTabVal] = React.useState(params.env);

  return (
    <>
      <div className="flex items-center justify-between sm:justify-around">
        <h2 className="text-xl font-semibold tracking-wider">DASHBOARDS</h2>
        <div className="flex items-center justify-center">
          <p className="text-lg tracking-wider underline">ENV :</p>
          <Tabs
            value={tabVal}
            onValueChange={(value) => {
              setTabVal(value);
            }}
          >
            <TabsList className={cn("ml-2 grid", row1.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
              {row1.map((tab) => (
                <Link
                  key={tab}
                  href={`/dashboard/tracking/${params.mode}/${tab.toLowerCase()}/${
                    params.dash
                  }?${searchParams.toString()}`}
                >
                  <TabsTrigger value={tab.toLowerCase()} className="w-full">
                    {tab}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TrackingEnvHeader;
