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
import { useDeleteNotifyIssueForm } from "@/utils/schema";
import { useDeleteNotifyIssueMutation } from "@/utils/mutation";

export const DeleteIssueForm = ({ ...props }) => {
  const [open, setOpen] = React.useState(false);
  const form = useDeleteNotifyIssueForm();

  const { mutate: server_delete, isPending: deletePending } = useDeleteNotifyIssueMutation(
    "DELETE",
    form,
    props.tableType,
    setOpen,
  );

  const onSubmit = (data: any) => {
    if (data.issueKey === props.issueKey) {
      //console.log("onSubmit", data);
      server_delete(data.issueKey);
    } else {
      form.setError("issueKey", {
        type: "custom",
        message: "Issue key does not match.",
      });
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="lessDanger">
          <CustomTrash className="mr-2 h-4 w-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Issue</DialogTitle>
          <DialogDescription>
            Please enter the issue key <span className="font-bold text-black">{props.issueKey}</span> to delete the
            issue.
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
                name="issueKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="issueKey">Delete Text</FormLabel>
                    <FormControl id="issueKey">
                      <Input type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="destructive" disabled={deletePending} className={cn("w-full capitalize")}>
                {deletePending ? "Deleting..." : "Delete"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
