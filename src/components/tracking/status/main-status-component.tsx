import React from "react";
import CarrierStatus from "./carrier-status";
import { Separator } from "@/components/ui/separator";

const MainStatusComponent = ({ ...props }) => {
  return (
    <div className="flex flex-col">
      <div className="">Current Issues. Coming soon....</div>
      <Separator className="my-6 bg-black"/>
      <div className="w-full">
        <CarrierStatus params={props.params} username={props.username} />
      </div>
      <Separator className="my-6 bg-black"/>
      <div className="">Past Issues. Coming soon...</div>
    </div>
  );
};

export default MainStatusComponent;
