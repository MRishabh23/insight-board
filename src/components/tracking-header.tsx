"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TrackingHeader = ({ params }: { params: { mode: string } }) => {
  const pathname = usePathname();
  const [tabVal, setTabVal] = React.useState(pathname.includes("dev") ? "dev" : "prod");

  return (
    <>
      <div
        className={cn("flex justify-between sm:justify-around items-center")}
      >
        <h2 className={cn("text-xl tracking-wider font-semibold")}>
          Shipment/AWB Tracking
        </h2>
        {/* <div className="flex justify-center items-center gap-2"> */}
          <Tabs
            value={tabVal}
            onValueChange={(value) => {
              setTabVal(value);
            }}
          >
            <TabsList className="grid grid-cols-2">
              <Link href={`/dashboard/tracking/${params.mode}/prod?dash=status`}>
                <TabsTrigger value="prod">PROD</TabsTrigger>
              </Link>
              <Link
                href={`/dashboard/tracking/${params.mode}/dev?dash=status`}
              >
                <TabsTrigger value="dev">DEV</TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
        {/* </div> */}
      </div>
    </>
  );
};

export default TrackingHeader;
