"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const TrackingHeader = () => {
  return (
    <>
    <div className={cn("flex justify-between sm:justify-around items-center")}>
      <h2 className={cn("text-xl tracking-wider font-semibold")}>
        Shipment/AWB Tracking
      </h2>
      <div className="flex justify-center items-center gap-2">
        <Tabs defaultValue="dev">
          <TabsList className="grid grid-cols-2">
            <Link href="/dashboard/tracking/dev?dash=status">
              <TabsTrigger value="dev">DEV</TabsTrigger>
            </Link>
            <Link href="/dashboard/tracking/prod?dash=status">
              <TabsTrigger value="prod">PROD</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </div>
    </div>
    </>
  );
};

export default TrackingHeader;
