import React from "react";
import { CarrierStatus } from "./carrier-status";
import { Separator } from "@/components/ui/separator";
import { CarrierIssueTab } from "./carrier-issue-tab";

const MainStatusComponent = ({ ...props }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <CarrierIssueTab />
      </div>
      <Separator className="my-6 bg-black" />
      <div className="w-full">
        <CarrierStatus params={props.params} username={props.username} />
      </div>
    </div>
  );
};

export default MainStatusComponent;
