import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function IssueDetailDrawer({ ...props }) {
  return (
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
  );
}

function SheetCustomContent({ ...props }) {
  return (
    <ScrollArea className="w-full mt-5 my-scroll">
      <div className="p-1">
        <IssueInput label="Issue" value={props.data.issue} />
        <IssueTextArea label="Description" value={props.data.description} />
        <IssueInput label="Carrier" value={props.data.carrier} />
        <IssueInput label="Environment" value={props.data.env} />
        <IssueInput label="Mode" value={props.data.mode.toUpperCase()} />
        <IssueInput label="Status" value={props.data.status} />
        <IssueInput label="Severity" value={props.data.severity} />
        {props.data.last_ui_notification_sent_at && (
          <IssueInput
            label="Last Notification Sent"
            value={props.data.last_ui_notification_sent_at}
          />
        )}
      </div>
    </ScrollArea>
  );
}

const IssueInput = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="mt-3">
      <Label className="text-base">{label}</Label>
      <Input className="mt-2" value={value} readOnly />
    </div>
  );
};

const IssueTextArea = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="mt-3">
      <Label className="text-base">{label}</Label>
      <Textarea className="mt-2 h-40" value={value} readOnly />
    </div>
  );
};
