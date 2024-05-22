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
import { ScrollArea } from "../../ui/scroll-area";

export function CustomDrawer({ ...props }) {
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
  let resId = props.resourceId;
  if (resId.includes("customfunction")) {
    resId = resId.replace("customfunction", "custom function");
  }

  const fetchHistoryQuery = useHistoryFetchQuery(
    props.params,
    props.schedulerId,
    resId
  );

  if (fetchHistoryQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }

  if (fetchHistoryQuery.isError || fetchHistoryQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">
          Error: {fetchHistoryQuery.error?.message}
        </p>
      </div>
    );
  }

  if (fetchHistoryQuery.data && !fetchHistoryQuery.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-red-500">{fetchHistoryQuery.data?.data}</p>
      </div>
    );
  }

  return <CustomView data={fetchHistoryQuery.data} />;
}

function CustomView({ ...props }) {
  return (
    <ScrollArea className="w-full mt-5 my-scroll">
      <JsonView value={props.data.data} />
    </ScrollArea>
  );
}
