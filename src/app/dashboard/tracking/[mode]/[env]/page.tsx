"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetUsername } from "@/hooks/get-username";
import CarrierStatus from "@/components/tracking/status/carrier-status";
import { CgSpinnerAlt } from "react-icons/cg";

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
        //defaultValue={searchParams.get("dash") || "status"}
        value={tabVal}
        //className="mt-2 flex h-full"
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("dash", value);
          setTabVal(value);
        }}
      >
        <div className="w-full space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="status">
              <Link href={pathname + "?dash=status"}>Status</Link>
            </TabsTrigger>
            <TabsTrigger value="summary">
              <Link href={pathname + "?dash=summary"}>Summary</Link>
            </TabsTrigger>
            <TabsTrigger value="history">
              <Link href={pathname + "?dash=history"}>History</Link>
            </TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3">
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
        <div className="w-full mt-4 p-5 bg-white text-primary rounded-md">
          <TabsContent value="status">
            <div className="flex flex-col">
              <div className="w-full">
                <CarrierStatus params={params} username={data?.data?.user?.username} />
              </div>
              <div className="mt-8">Hello</div>
              <div className="mt-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                temporibus, facilis placeat accusantium, tenetur eos fugit
                molestiae similique incidunt a dignissimos praesentium ullam
                dolore voluptatem perspiciatis? Id, sequi magnam! Culpa quia
                voluptatem cum, est dolorum non deleniti repudiandae quaerat
                laboriosam cumque molestias voluptates, fugiat debitis rerum
                nesciunt officiis tempora aspernatur vero.
              </div>
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <div>Summary</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              quidem repudiandae cumque maxime rerum voluptatum aliquam ad
              voluptate, id nemo expedita enim eius vel repellat, officiis
              excepturi ipsa iure. Iste!
            </p>
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
