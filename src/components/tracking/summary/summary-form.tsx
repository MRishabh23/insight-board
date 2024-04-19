import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
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
import { usePathname } from "next/navigation";
import { getCarriersList, getQueueList } from "@/utils/pre-define-data/data";

const formSchema = z.object({
  carriers: z.set(z.string()).max(5, "Please select up to 5 carriers"),
  queue: z.set(z.string()),
  range: z.object({}),
});

const SummaryForm = ({ ...props }) => {
  const sD = new Date();
  sD.setDate(sD.getDate() - 1);
  const eD = new Date();

  const carriers = getCarriersList(props.params.mode);
  const queue = getQueueList();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carriers: new Set([]),
      queue: new Set([]),
      range: {},
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex flex-row flex-wrap justify-around items-center gap-3 rounded-md border border-gray-200 p-3"
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
                  className="max-w-xs w-[300px] sm:w-[400px]"
                  selectedKeys={field.value}
                  onSelectionChange={field.onChange}
                >
                  {carriers.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.value}
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
                  className="max-w-xs w-[300px] sm:w-[400px]"
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
                  isDisabled={
                    form.getValues("carriers").size === 1 ? false : true
                  }
                  defaultValue={{
                    start: parseDate(sD.toISOString().substring(0, 10)),
                    end: parseDate(eD.toISOString().substring(0, 10)),
                  }}
                  onChange={field.onChange}
                  className="max-w-xs w-[300px] sm:w-[400px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[100px] capitalize">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SummaryForm;
