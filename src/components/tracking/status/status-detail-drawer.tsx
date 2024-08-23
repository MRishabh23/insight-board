import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

export function StatusDetailDrawer({ ...props }) {
  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={props.variant}>{props.buttonTitle}</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{props.title}</SheetTitle>
          </SheetHeader>
          <SheetCustomContent data={props.data} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SheetCustomContent({ ...props }) {
  return (
    <ScrollArea className="my-scroll mt-5 w-full">
      <div className="p-1">
        {props.data.carrier && <StatusInput label="Carrier" value={props.data.carrier} />}
        <StatusInput label="Status" value={props.data.status} />
        <StatusInput label="Status Type" value={props.data.statusType} />
        <StatusTextArea label="Issue" value={props.data.issue} />
        <StatusTextArea label="Impact" value={props.data.impact} />
        {props.data.rca && <StatusTextArea label="RCA" value={props.data.rca} />}
        <StatusInput label="Expected Resolution Date" value={props.data.expectedResolutionDate} />
        <StatusInput label="Resolution" value={props.data.resolution} />
        {props.data.closedAt && <StatusInput label="Closed At" value={props.data.closedAt} />}
      </div>
    </ScrollArea>
  );
}

const StatusInput = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="mt-3">
      <Label className="text-base">{label}</Label>
      <Input className="mt-2" value={value} readOnly />
    </div>
  );
};

const StatusTextArea = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="mt-3">
      <Label className="text-base">{label}</Label>
      <Textarea className="mt-2 h-40" value={value} readOnly />
    </div>
  );
};
