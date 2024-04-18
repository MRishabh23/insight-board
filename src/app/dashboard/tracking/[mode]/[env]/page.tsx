"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetUsername } from "@/hooks/get-username";
import { CgSpinnerAlt } from "react-icons/cg";
import MainStatusComponent from "@/components/tracking/status/main-status-component";
import MainSummaryComponent from "@/components/tracking/summary/main-summary-component";

const SlugPage = ({ params }: { params: { mode: string; env: string } }) => {
  const { isPending, data, isError, error } = useGetUsername();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tabVal, setTabVal] = React.useState(
    searchParams.get("dash") || "status"
  );

  if (isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (isError || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <p className="text-lg">Select a dashboard: </p>
      <Tabs
        value={tabVal}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("dash", value);
          setTabVal(value);
        }}
      >
        <div className="w-full space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="status">
              <Link href={{pathname: pathname, query: {dash: "status"}}}>Status</Link>
            </TabsTrigger>
            <TabsTrigger value="summary">
              <Link href={{pathname: pathname, query: {dash: "summary"}}}>Summary</Link>
            </TabsTrigger>
            <TabsTrigger value="history">
              <Link href={{pathname: pathname, query: {dash: "history"}}}>History</Link>
            </TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="references">
              <Link href={{pathname: pathname, query: {dash: "references"}}}>References</Link>
            </TabsTrigger>
            <TabsTrigger value="latency">
              <Link href={{pathname: pathname, query: {dash: "latency"}}}>Latency</Link>
            </TabsTrigger>
            <TabsTrigger value="induced">
              <Link href={{pathname: pathname, query: {dash: "induced"}}}>Induced-Latency</Link>
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full mt-4 p-5 bg-white text-primary rounded-md">
          <TabsContent value="status">
            <MainStatusComponent
              params={params}
              username={data?.data?.user?.username}
            />
          </TabsContent>
          <TabsContent value="summary">
            <MainSummaryComponent
              params={params}
              username={data?.data?.user?.username}
            />
          </TabsContent>
          <TabsContent value="history">
            <div>History</div>
          </TabsContent>
          <TabsContent value="references">
            <div>References</div>
          </TabsContent>
          <TabsContent value="latency">
            <div>Latency</div>
          </TabsContent>
          <TabsContent value="induced">
            <div>Induced</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SlugPage;
