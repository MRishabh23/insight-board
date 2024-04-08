"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className={cn("h-full flex flex-col justify-center items-center")}>
      <Link href="/dashboard/tracking/dev?dash=status">
        <Card
          className={cn("w-[220px] h-[150px] flex justify-center items-center hover:scale-105 bg-gradient-to-r from-blue-100 to-blue-200")}
        >
          <p className={cn("text-2xl tracking-widest font-medium")}>Tracking</p>
        </Card>
      </Link>
    </div>
  );
};

export default Dashboard;
