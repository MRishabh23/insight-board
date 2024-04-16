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
import { HiPencil } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type StatusData = {
  carrier: string;
  status: string;
};

const formSchema = z.object({
  carrier: z.string(),
  status: z.string(),
});

export function CarrierStatusTable({ ...props }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carrier: "",
      status: "",
    },
  });

  const onSubmit = async (data: StatusData) => {
    try {
      //setBtnLoad(true);
      //await axios.post(`/api/tracking/status`, data);
      console.log(data);
      toast.success("Carrier status updated successfully!");
    } catch (error: any) {
      toast.error(`Uh oh! Something went wrong, while updating status.`, {
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
      });
    } finally {
      //setBtnLoad(false);
      form.reset({ carrier: "", status: "" });
    }
  };

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
                            <HiPencil />
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
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className={cn(
                                  "mt-5 space-y-5 rounded-md border border-gray-200 p-3"
                                )}
                              >
                                <FormField
                                  control={form.control}
                                  name="carrier"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="carrier">
                                        Carrier
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        //defaultValue={item.carrier.toLowerCase()}
                                      >
                                        <FormControl id="carrier">
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select carrier" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value={item.carrier}>
                                              {item.carrier}
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="status">
                                        Status
                                      </FormLabel>
                                      <Select onValueChange={field.onChange}>
                                        <FormControl id="status">
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="operational">
                                              OPERATIONAL
                                            </SelectItem>
                                            <SelectItem value="partial">
                                              PARTIAL-OUTAGE
                                            </SelectItem>
                                            <SelectItem value="degraded">
                                              DEGRADED-PERFORMANCE
                                            </SelectItem>
                                            <SelectItem value="outage">
                                              OUTAGE
                                            </SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <DialogTrigger
                                  className="w-full"
                                  asChild={false}
                                >
                                  <Button
                                    type="submit"
                                    //disabled={btnLoad ? true : false}
                                    className={cn("w-full capitalize")}
                                  >
                                    Save Changes
                                  </Button>
                                </DialogTrigger>
                              </form>
                            </Form>
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
