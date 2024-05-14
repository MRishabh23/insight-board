"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
//import { format } from "date-fns";

const TrackingDashHeader = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  
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
        queue: "NORMAL",
        from: "",
        to: ""
      },
    },
    {
      name: "History",
      path: `/dashboard/tracking/${params.mode}/${params.env}/history`,
      query: {
        subId: "",
        historyType: "DIFF",
        from: "",
        to: ""
      }
    },
  ];

  const tabsRow2 = [
    {
      name: "References",
      path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
      query: {
        category: "all",
        carriers: "ACL",
        queue: "NORMAL",
        refType: "BOOKING",
        active: "yes",
        bucket: "",
        page: 1,
      }
    },
    {
      name: "Latency",
      path: `/dashboard/tracking/${params.mode}/${params.env}/latency`,
      query: {
        carriers: "",
        queue: "NORMAL",
        refType: "ALL"
      }
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
      <Tabs
        value={tabVal}
        onValueChange={(value) => {
          setTabVal(value);
        }}
      >
        <div className="w-full space-y-4 mt-6">
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
