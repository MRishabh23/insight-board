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
import { CustomTrash } from "@/components/icons/common";
import { useCloseDeleteStatusForm } from "@/utils/schema";
import { useDeleteStatusMutation } from "@/utils/mutation";
import { useParams } from "next/navigation";
import { ParamType } from "@/utils/types/common";

export const DeleteStatusForm = ({ ...props }) => {
  const [open, setOpen] = React.useState(false);
  const params = useParams<ParamType>();
  const form = useCloseDeleteStatusForm();

  const { mutate: server_delete, isPending: deletePending } = useDeleteStatusMutation(
    form,
    setOpen,
    params,
    props.carrier,
    props.tableType
  );

  const onSubmit = (data: any) => {
    if (data.statusKey === props.statusKey) {
      //console.log("onSubmit", data);
      server_delete(data.statusKey);
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
          <Button variant="lessDanger">
            <CustomTrash className="mr-2 h-4 w-4" /> Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Status</DialogTitle>
            <DialogDescription>
              Please enter the status key <span className="font-bold text-black">{props.statusKey}</span> to delete the
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
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={deletePending}
                  className={cn("w-full capitalize")}
                >
                  {deletePending ? "Deleting..." : "Delete"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
