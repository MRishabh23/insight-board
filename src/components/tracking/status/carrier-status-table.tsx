import React from "react";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableDiv,
  TableHead,
  TableHeader,
  TableRow,
  TableTwo,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "@/components/icons/pencil-icon";

type StatusData = {
  carrier: string;
  status: string;
};

export function CarrierStatusTable({ ...props }) {
  return (
    <>
      {props.statusList.data?.data.includes("data not present") ? (
        <div className="h-full flex flex-col justify-center items-center">
          <p className="text-red-500">Error: {props.statusList.data?.data}</p>
        </div>
      ) : (
        <TableDiv className="h-96">
          <TableTwo>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead>Carrier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(props.statusList.data?.data) &&
                props.statusList.data?.data.length > 0 &&
                props.statusList.data?.data.map((item: StatusData) => (
                  <TableRow key={item.carrier}>
                    <TableCell className="font-semibold">
                      {item.carrier}
                    </TableCell>
                    <TableCell className="">
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
                            : "bg-black"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <PencilIcon className="w-4 h-4 mr-2"/> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Carrier Status</DialogTitle>
                            <DialogDescription>
                              Make changes to carrier status here. Click save
                              when you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <TableStatusForm
                              params={props.params}
                              username={props.username}
                              item={item}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableTwo>
        </TableDiv>
      )}
    </>
  );
}

const formSchema = z.object({
  carrier: z.string(),
  status: z.string(),
});

const TableStatusForm = ({ ...props }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carrier: props.item.carrier,
      status: props.item.status.toLowerCase(),
    },
  });

  const queryClient = useQueryClient();

  const mutateStatus = useMutation({
    mutationFn: (data: StatusData) => {
      return axios({
        method: "post",
        url: "/api/tracking/status",
        data: {
          type: "UPDATE_CARRIER_STATUS",
          username: props.username,
          env: props.params.env.toUpperCase(),
          mode: props.params.mode.toUpperCase(),
          carrier: data.carrier,
          status: data.status,
        },
      });
    },

    onSuccess: () => {
      toast.success("Carrier status updated successfully!");
    },
    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, while updating status.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: [
            "carrier-status",
            `/dashboard/tracking/${props.params.mode}/${props.params.env}/status`,
          ],
        });
      }
    },
  });

  const onSubmit = (data: StatusData) => {
    mutateStatus.mutate(data);
  };

  return (
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
                    <SelectItem value="partial-outage">
                      PARTIAL-OUTAGE
                    </SelectItem>
                    <SelectItem value="degraded-performance">
                      DEGRADED-PERFORMANCE
                    </SelectItem>
                    <SelectItem value="outage">OUTAGE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutateStatus.isPending}
          className={cn("w-full capitalize")}
        >
          {mutateStatus.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
