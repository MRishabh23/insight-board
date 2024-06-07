import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useHistoryFetchQuery } from "@/utils/query";
import JsonView from "@uiw/react-json-view";
import { CgSpinnerAlt } from "react-icons/cg";
import { ScrollArea } from "../../ui/scroll-area";

export function HistoryDrawer({ ...props }) {
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
          <SheetCustomContent {...props} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SheetCustomContent({ ...props }) {
  let resId = props.resourceId;
  if (resId.includes("customfunction")) {
    resId = resId.replace("customfunction", "custom function");
  }

  const fetchHistoryQuery = useHistoryFetchQuery(props.params, props.schedulerId, resId);

  if (fetchHistoryQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (fetchHistoryQuery.isError || fetchHistoryQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {fetchHistoryQuery.error?.message}</p>
      </div>
    );
  }

  if (fetchHistoryQuery.data && !fetchHistoryQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{fetchHistoryQuery.data?.data}</p>
      </div>
    );
  }

  return <CustomView data={fetchHistoryQuery.data} />;
}

function CustomView({ ...props }) {
  return (
    <ScrollArea className="my-scroll mt-5 w-full">
      <JsonView value={props.data.data} />
    </ScrollArea>
  );
}
