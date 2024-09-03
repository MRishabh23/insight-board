import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import Link from "next/link";

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
  const jiraLinks = React.useMemo(
    () => (props.data.jiraLink ? props.data.jiraLink : []),
    [props.data.jiraLink],
  );
  return (
    <ScrollArea className="my-scroll mt-5 w-full">
      <div className="p-1">
        {props.data.carrier && <StatusInput label="Carrier" value={props.data.carrier} />}
        <StatusInput label="Status" value={props.data.status} />
        <StatusInput label="Status Type" value={props.data.statusType} />
        <StatusTextArea label="Issue" value={props.data.issue} />
        <StatusTextArea label="Impact" value={props.data.impact} />
        <StatusInput label="Expected Resolution Date" value={props.data.expectedResolutionDate} />
        <StatusInput label="Resolution" value={props.data.resolution} />
        {props.data.closedAt && <StatusInput label="Closed At" value={props.data.closedAt} />}
        {jiraLinks.length > 0 && (
          <div className="mt-3">
            <Label className="text-base">Jira Links</Label>
            <CustomLinkInput value={jiraLinks} />
          </div>
        )}
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

const CustomLinkInput = ({ value }: { value: any }) => {
  return (
    <ul className="mt-2">
      {value.includes(",") ? (
        value.split(",").map((link: string, index: number) => (
          <Link key={link} href={link} target="_blank">
            <li className="p-2">
              {index + 1}. <span className="underline hover:text-indigo-500">{link}</span>
            </li>
          </Link>
        ))
      ) : (
        <Link href={value} target="_blank">
          <li className="p-2">
            1. <span className="underline hover:text-indigo-500">{value}</span>
          </li>
        </Link>
      )}
    </ul>
  );
};
