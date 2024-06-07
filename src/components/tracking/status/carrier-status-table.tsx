import React from "react";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableDiv, TableHead, TableHeader, TableRow, TableTwo } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

export function CarrierStatusTable({ ...props }) {
  return (
    <>
      <TableDiv className="h-[620px]">
        <TableTwo>
          <TableHeader className="sticky top-0 bg-white">
            <TableRow>
              <TableHead className="text-center">Carrier</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(props.statusList.data) &&
              props.statusList.data.length > 0 &&
              props.statusList.data.map((item: StatusType) => (
                <TableRow key={item.carrier} className="text-center">
                  <TableCell className="font-semibold">{item.carrier}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "tracking-wide",
                        item.status.toLowerCase().includes("operation")
                          ? "bg-green-500 hover:bg-green-400"
                          : item.status.toLowerCase().includes("partial")
                            ? "bg-yellow-500 hover:bg-yellow-400"
                            : item.status.toLowerCase().includes("degraded")
                              ? "bg-orange-500 hover:bg-orange-400"
                              : item.status.toLowerCase().includes("outage")
                                ? "bg-red-600 hover:bg-red-500"
                                : "bg-black",
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TableStatusForm params={props.params} username={props.username} item={item} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableTwo>
      </TableDiv>
    </>
  );
}

const TableStatusForm = ({ ...props }) => {
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
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilIcon className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Carrier Status</DialogTitle>
          <DialogDescription>Make changes to carrier status here. Click save when you&apos;re done.</DialogDescription>
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
  );
};
