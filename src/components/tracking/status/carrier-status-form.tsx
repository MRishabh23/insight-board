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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "@/components/icons/common";
import { StatusType } from "@/utils/types/common";
import { useStatusForm } from "@/utils/schema";
import { useStatusMutation } from "@/utils/mutation";

export const TableStatusForm = ({ ...props }) => {
  const [open, setOpen] = React.useState(false);
  const form = useStatusForm(props.item);

  const { mutate: server_updateStatus, isPending: statusPending } = useStatusMutation(props.params, setOpen);

  const onSubmit = (data: StatusType) => {
    server_updateStatus(data);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PencilIcon className="mr-2 h-4 w-4" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Carrier Status</DialogTitle>
            <DialogDescription>
              Make changes to carrier status here. Click save when you&apos;re done.
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
                  name="carrier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="carrier">Carrier</FormLabel>
                      <FormControl id="carrier">
                        <Input type="text" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="status">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl id="status">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="operational">OPERATIONAL</SelectItem>
                            <SelectItem value="partial-outage">PARTIAL-OUTAGE</SelectItem>
                            <SelectItem value="degraded-performance">DEGRADED-PERFORMANCE</SelectItem>
                            <SelectItem value="outage">OUTAGE</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={statusPending} className={cn("w-full capitalize")}>
                  {statusPending ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
