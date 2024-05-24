import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useReferenceInfoQuery } from "@/utils/query";
import JsonView from "@uiw/react-json-view";
import { CgSpinnerAlt } from "react-icons/cg";
import { ScrollArea } from "../../ui/scroll-area";

export function CustomDrawerReference({ ...props }) {
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
  let resId = props.resource;

  const referenceInfoQuery = useReferenceInfoQuery(
    props.params,
    props.searchParams,
    resId
  );

  if (referenceInfoQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (referenceInfoQuery.isError || referenceInfoQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-6">
        <p className="text-red-500">
          Error: {referenceInfoQuery.error?.message}
        </p>
      </div>
    );
  }

  if (referenceInfoQuery.data && !referenceInfoQuery.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center mt-10">
        <p className="text-red-500">{referenceInfoQuery.data?.data}</p>
      </div>
    );
  }

  return <CustomView data={referenceInfoQuery.data} />;
}

function CustomView({ ...props }) {
  return (
    <ScrollArea className="w-full mt-5 my-scroll">
      <JsonView value={props.data.data} />
    </ScrollArea>
  );
}
