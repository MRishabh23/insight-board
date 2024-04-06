"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className={cn("h-full flex flex-col justify-center items-center")}>
      <Link href="/dashboard/tracking">
        <Card
          className={cn("w-[220px] h-[150px] flex justify-center items-center hover:scale-105 bg-gradient-to-r from-neutral-100 to-neutral-400")}
        >
          <p className={cn("text-2xl tracking-widest font-bold text-blue-900")}>Tracking</p>
        </Card>
      </Link>
    </div>
  );
};

export default Dashboard;
