"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackingStatus from "@/components/tracking-status";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const SlugPage = ({ params }: { params: { env: string } }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [tabVal, setTabVal] = React.useState(
    searchParams.get("dash") || "status"
  );

  return (
    <div className="h-full">
      <p className="text-lg">Select a dashboard: </p>
      <Tabs
        //defaultValue={searchParams.get("dash") || "status"}
        value={tabVal}
        className="mt-2 flex h-full"
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("dash", value);
          setTabVal(value);
        }}
      >
        <div className="h-[300px] w-[200px]">
          <TabsList className="grid grid-rows-6 h-full">
            <TabsTrigger value="status">
              <Link href={pathname + "?dash=status"}>Status</Link>
            </TabsTrigger>
            <TabsTrigger value="summary">
              <Link href={pathname + "?dash=summary"}>Summary</Link>
            </TabsTrigger>
            <TabsTrigger value="history">
              <Link href={pathname + "?dash=history"}>History</Link>
            </TabsTrigger>
            <TabsTrigger value="references">
              <Link href={pathname + "?dash=references"}>References</Link>
            </TabsTrigger>
            <TabsTrigger value="latency">
              <Link href={pathname + "?dash=latency"}>Latency</Link>
            </TabsTrigger>
            <TabsTrigger value="induced">
              <Link href={pathname + "?dash=induced"}>Induced-Latency</Link>
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="ml-8 w-full">
          <TabsContent value="status">
            <TrackingStatus env={params.env} />
          </TabsContent>
          <TabsContent value="summary">
            <div>Summary</div>
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
          <TabsContent value="Induced">
            <div>Induced</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SlugPage;
