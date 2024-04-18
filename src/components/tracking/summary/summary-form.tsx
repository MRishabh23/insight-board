import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import {DateRangePicker} from "@nextui-org/date-picker";
import {parseDate} from "@internationalized/date";
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
import { Button } from "@/components/ui/button";

const carriers = [
  {
    label: "MAERSK",
    value: "maersk",
  },
  {
    label: "HAPAG",
    value: "hapag",
  },
  {
    label: "ZIM",
    value: "zim",
  },
  {
    label: "DHL",
    value: "dhl",
  },
  {
    label: "COSCO",
    value: "cosco",
  },
  {
    label: "HYUNDAI",
    value: "hyundai",
  },
];

const queue = [
  {
    label: "Normal",
    value: "NORMAL",
  },
  {
    label: "Adaptive",
    value: "ADAPTIVE",
  },
  {
    label: "Reference Not Found",
    value: "RNF",
  },
];

const formSchema = z.object({
  carriers: z.set(z.string()).max(5, "Please select up to 5 carriers"),
  queue: z.set(z.string()),
  range: z.object({}),
});

const SummaryForm = () => {
  const sD = new Date();
  sD.setDate(sD.getDate() - 1);
  const eD = new Date();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carriers: new Set([]),
      queue: new Set([]),
      range: {}
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(data.carriers);
    console.log(data.queue);
    console.log(data.range);
  };

  React.useEffect(() => {
    console.log(form.getValues("carriers"));
  },[form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-4 rounded-md border border-gray-200 p-3"
        >
          <FormField
            control={form.control}
            name="carriers"
            render={({ field }) => (
              <FormItem>
                <Select
                  label="Carriers"
                  placeholder="Select an carrier"
                  selectionMode="multiple"
                  className="max-w-xs"
                  selectedKeys={field.value}
                  onSelectionChange={field.onChange}
                >
                  {carriers.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="queue"
            render={({ field }) => (
              <FormItem>
                <Select
                  label="Queue"
                  placeholder="Select an queue type"
                  selectionMode="single"
                  className="max-w-xs"
                  selectedKeys={field.value}
                  onSelectionChange={field.onChange}
                >
                  {queue.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem>
                <DateRangePicker
                  label="Select a date range"
                  aria-label="Select a date range"
                  isDisabled={form.getValues("carriers").size === 1 ? false : true}
                  defaultValue={{
                    start: parseDate(sD.toISOString().substring(0, 10)),
                    end: parseDate(eD.toISOString().substring(0, 10)),
                  }}
                  onChange={field.onChange}
                  className="max-w-xs"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full capitalize">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SummaryForm;
