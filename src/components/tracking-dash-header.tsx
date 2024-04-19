"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const TrackingDashHeader = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  const tabsRow1 = ["Status", "Summary", "History"];
  const tabsRow2 = ["References", "Latency", "Induced"];
  const [tabVal, setTabVal] = React.useState(params.dash);

  return (
    <>
      <p className="text-lg mt-4">Select a dashboard: </p>
      <Tabs
        value={tabVal}
        onValueChange={(value) => {
          setTabVal(value);
        }}
      >
        <div className="w-full space-y-4">
          <TabsList className="grid grid-cols-3">
            {tabsRow1.map((tab) => (
              <Link
                key={tab}
                href={`/dashboard/tracking/${params.mode}/${
                  params.env
                }/${tab.toLowerCase()}`}
              >
                <TabsTrigger value={tab.toLowerCase()} className="w-full">
                  {tab}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
          <TabsList className="grid grid-cols-3">
            {tabsRow2.map((tab) => (
              <Link
                key={tab}
                href={`/dashboard/tracking/${params.mode}/${
                  params.env
                }/${tab.toLowerCase()}`}
              >
                <TabsTrigger value={tab.toLowerCase()} className="w-full">
                  {tab}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </>
  );
};

export default TrackingDashHeader;
