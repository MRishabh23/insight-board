import React from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCarriersList, getQueueList } from "@/utils/pre-define-data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/multi-select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  carriers: z.array(optionSchema).max(5, "Please select up to 5 carriers"),
  queue: z.string(),
  range: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

const sD = new Date();
sD.setDate(sD.getDate() - 1);
const eD = new Date();

export const SummaryForm = ({ ...props }) => {
  const carriersOptions = getCarriersList(props.params.mode);
  const queueOptions = getQueueList();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryCarriers = searchParams.get("carriers")?.split(",") || [];
  let newCarrOpt: any = [];

  if (queryCarriers.length > 0) {
    queryCarriers.map((carrier) => {
      if (carrier) {
        const carrObj = {
          label: carrier,
          value: carrier,
        };
        newCarrOpt.push(carrObj);
      }
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carriers: newCarrOpt,
      queue: searchParams.get("queue") || "NORMAL",
      range: {
        from: new Date(searchParams.get("from") || format(sD, "yyyy-MM-dd")),
        to: new Date(searchParams.get("to") || format(eD, "yyyy-MM-dd")),
      },
    },
  });

  const onSubmit = (data: any) => {
    //console.log("submit data", data);
    const q = createQueryString(data);
    router.push(pathname + "?" + q);
  };

  const createQueryString = React.useCallback(
    (data: any) => {
      let str = "";
      if (data.carriers.length > 0) {
        data.carriers.map((carrier: any) => {
          str += carrier.value + ",";
        });
      }
      const params = new URLSearchParams(searchParams.toString());
      if (str !== "") {
        params.set("carriers", str);
      } else {
        params.set("carriers", "");
      }
      params.set("queue", data.queue);
      if (data.carriers.length === 1) {
        params.set("from", format(data.range.from, "yyyy-MM-dd"));
        params.set("to", format(data.range.to, "yyyy-MM-dd"));
      } else {
        params.set("from", "");
        params.set("to", "");
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 rounded-md border border-gray-200 p-3"
        >
          <FormField
            control={form.control}
            name="carriers"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="carriers">Carriers</FormLabel>
                <FormControl id="carriers">
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={carriersOptions}
                    placeholder="Select Carriers you like..."
                    hidePlaceholderWhenSelected
                    maxSelected={5}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="queue"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="queue">Queue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl id="queue">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a queue..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {queueOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem
                className={cn(
                  form.watch("carriers").length === 1
                    ? "flex flex-col mt-6"
                    : "hidden"
                )}
              >
                <FormLabel htmlFor="dateRange">Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl id="dateRange">
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={
                          form.watch("carriers").length === 1 ? false : true
                        }
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      max={15}
                      defaultMonth={field.value?.from}
                      toDate={field.value?.to}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[100px] mt-4 capitalize">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
