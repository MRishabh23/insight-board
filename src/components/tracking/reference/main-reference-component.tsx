"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { ReferenceAllForm } from "./reference-all-form";
import { ReferenceAllTable } from "./reference-all-table";

export default function MainReferenceComponent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [tabVal, setTabVal] = React.useState(
    searchParams.get("category") || "all"
  );

  const row1 = [
    {
      value: "all",
      name: "All",
      path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
      query: {
        category: "all",
        carriers: "ACL",
        queue: "NORMAL",
        refType: "BOOKING",
        active: "yes",
        bucket: "",
        page: 1,
      },
    },
    {
      value: "subscription",
      name: "Subscription",
      path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
      query: {
        category: "subscription",
        subscriptionId: "",
      },
    },
    {
      value: "reference",
      name: "Reference",
      path: `/dashboard/tracking/${params.mode}/${params.env}/references`,
      query: {
        category: "subscription",
        referenceId: "",
      },
    },
  ];

  return (
    <Tabs
      className="w-full"
      value={tabVal}
      onValueChange={(value) => {
        setTabVal(value);
      }}
    >
      <TabsList className="grid w-full grid-cols-3">
        {row1.map((tab) => (
          <Link key={tab.value} href={{ pathname: tab.path, query: tab.query }}>
            <TabsTrigger value={tab.value} className="w-full">
              {tab.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      <TabsContent value="all">
        <div className="flex flex-col">
          {/* <ReferenceAllForm />
          <ReferenceAllTable /> */}
          Coming Soon....
        </div>
      </TabsContent>
      <TabsContent value="subscription">
        <div>subscription</div>
      </TabsContent>
      <TabsContent value="reference">
        <div>reference</div>
      </TabsContent>
    </Tabs>
  );
}
