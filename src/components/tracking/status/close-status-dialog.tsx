import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCloseDeleteStatusForm } from "@/utils/schema";
import { useCloseStatusMutation } from "@/utils/mutation";
import { useParams } from "next/navigation";
import { ParamType } from "@/utils/types/common";
import { Textarea } from "@/components/ui/textarea";

export const CloseStatusForm = ({ ...props }) => {
  const [open, setOpen] = React.useState(false);
  const params = useParams<ParamType>();
  const form = useCloseDeleteStatusForm();

  const { mutate: server_close, isPending: closePending } = useCloseStatusMutation(
    form,
    setOpen,
    params,
    props.carrier,
  );

  const onSubmit = (data: any) => {
    if (!data.rca) {
      form.setError("rca", {
        type: "custom",
        message: "Please enter a proper RCA.",
      });
    }

    if (data.statusKey === props.statusKey) {
      //console.log("onSubmit", data);
      server_close(data);
    } else {
      form.setError("statusKey", {
        type: "custom",
        message: "Status key does not match.",
      });
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Close</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Close Status</DialogTitle>
            <DialogDescription>
              <strong>Before entering the status key, Please make sure that the RCA is filled out. </strong>
              Please enter the status key <span className="font-bold text-black">{props.statusKey}</span> to close the
              status.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("mt-5 space-y-5 rounded-md border border-gray-200 p-3")}
              >
                <FormField
                  control={form.control}
                  name="rca"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-base" htmlFor="rca">
                        RCA
                      </FormLabel>
                      <FormControl id="rca">
                        <Textarea className="h-24" placeholder="rca..." required minLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="statusKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="statusKey">Status Key</FormLabel>
                      <FormControl id="statusKey">
                        <Input type="text" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="destructive" disabled={closePending} className={cn("w-full capitalize")}>
                  {closePending ? "Closing..." : "Close"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
