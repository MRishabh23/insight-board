import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useHistoryFetchQuery } from "@/utils/query";
import JsonView from "@uiw/react-json-view";
import { CgSpinnerAlt } from "react-icons/cg";
import { ScrollArea } from "@/components/ui/scroll-area";

export function IssueDrawer({ ...props }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={props.variant}>{props.buttonTitle}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
        </SheetHeader>
        <SheetCustomContent {...props} />
      </SheetContent>
    </Sheet>
  );
}

function SheetCustomContent({ ...props }) {
  return (
    <ScrollArea className="w-full mt-5 my-scroll">
      <div>Data....</div>
    </ScrollArea>
  );
}
