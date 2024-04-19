import React from "react";
import CarrierStatus from "./carrier-status";
import { Separator } from "@/components/ui/separator";
import CarrierCurrentIssueComponent from "./carrier-current-issues";
import CarrierPastIssueComponent from "./carrier-past-issues";

const MainStatusComponent = ({ ...props }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <CarrierCurrentIssueComponent/>
      </div>
      <Separator className="my-6 bg-black"/>
      <div className="w-full">
        <CarrierStatus params={props.params} username={props.username} />
      </div>
      <Separator className="my-6 bg-black"/>
      <div className="">
        <CarrierPastIssueComponent/>
      </div>
    </div>
  );
};

export default MainStatusComponent;
