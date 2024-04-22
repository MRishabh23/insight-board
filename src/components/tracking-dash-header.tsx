"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { format } from "date-fns";

const TrackingDashHeader = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  const sD = new Date();
  sD.setDate(sD.getDate() - 1);
  const eD = new Date();
  const tabsRow1 = [
    {
      name: "Status",
      path: `/dashboard/tracking/${params.mode}/${params.env}/status`,
      query: {}
    },
    {
      name: "Summary",
      path: `/dashboard/tracking/${params.mode}/${params.env}/summary`,
      query: {
        carriers: "",
        queue: "",
        from: format(sD, "yyyy-MM-dd"),
        to: format(eD, "yyyy-MM-dd"),
      },
    },
    {
      name: "History",
      path: `/dashboard/tracking/${params.mode}/${params.env}/history`,
      query: {}
    },
  ];

  const tabsRow2 = [
    {
      name: "References",
      path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
      query: {}
    },
    {
      name: "Latency",
      path: `/dashboard/tracking/${params.mode}/${params.env}/latency`,
      query: {}
    },
    {
      name: "Induced",
      path: `/dashboard/tracking/${params.mode}/${params.env}/induced`,
      query: {}
    },
  ];
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
              <Link key={tab.name} href={{ pathname: tab.path, query: tab.query }}>
                <TabsTrigger value={tab.name.toLowerCase()} className="w-full">
                  {tab.name}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
          <TabsList className="grid grid-cols-3">
            {tabsRow2.map((tab) => (
              <Link
                key={tab.name}
                href={{ pathname: tab.path, query: tab.query }}
              >
                <TabsTrigger value={tab.name.toLowerCase()} className="w-full">
                  {tab.name}
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
