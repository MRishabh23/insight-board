import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useReferenceInfoQuery } from "@/utils/query";
import JsonView from "@uiw/react-json-view";
import { CgSpinnerAlt } from "react-icons/cg";
import { ScrollArea } from "../../ui/scroll-area";

export function ReferenceDrawer({ ...props }) {
  return (
    <div className="w-32 flex items-center justify-center">
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
  let resId = props.resource;

  const referenceInfoQuery = useReferenceInfoQuery(props.params, props.searchParams, resId);

  if (referenceInfoQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (referenceInfoQuery.isError || referenceInfoQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {referenceInfoQuery.error?.message}</p>
      </div>
    );
  }

  if (referenceInfoQuery.data && !referenceInfoQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{referenceInfoQuery.data?.data}</p>
      </div>
    );
  }

  return <CustomView data={referenceInfoQuery.data} />;
}

function CustomView({ ...props }) {
  return (
    <ScrollArea className="my-scroll mt-5 w-full">
      <JsonView value={props.data.data} />
    </ScrollArea>
  );
}
