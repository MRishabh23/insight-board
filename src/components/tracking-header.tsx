"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const TrackingHeader = () => {
  const [check, setCheck] = React.useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div className={cn("flex justify-around items-center")}>
      <h2 className={cn("text-xl tracking-wider font-semibold")}>
        Shipment/AWB Tracking
      </h2>
      <div className="flex justify-center items-center gap-2">
        <Label htmlFor="dev" className="text-base">
          DEV
        </Label>
        <Switch
          id={check ? "prod" : "dev"}
          checked={check}
          onCheckedChange={handleCheck}
        />
        <Label htmlFor="prod" className="text-base">
          PROD
        </Label>
      </div>
    </div>
  );
};

export default TrackingHeader;
