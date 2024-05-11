import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getHistoryType } from "@/utils/pre-define-data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, millisecondsToHours, startOfDay, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHistoryForm } from "@/utils/schema";
import { Input } from "@/components/ui/input";
import { HistoryFormType } from "@/utils/types/common";

export const HistoryForm = () => {
  const historyOptions = getHistoryType();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [btnLoad, setBtnLoad] = React.useState(false);

  const form = useHistoryForm(searchParams);

  const onSubmit = (data: any) => {
    //console.log("submit data", data);
    setBtnLoad(true);
    const subTract = data.range.to - data.range.from;
    if(millisecondsToHours(subTract) > 360){
      form.setError("range", {
        type: "custom",
        message: "Date range should be less than or equal to 15 days.",
      });
      setBtnLoad(false);
    }else{
      setTimeout(() => {
        const q = createQueryString(data);
        router.push(pathname + "?" + q);
        setBtnLoad(false);
      }, 1000);
    }
  };

  const createQueryString = React.useCallback(
    (data: HistoryFormType) => {

      const historyParams = new URLSearchParams(searchParams.toString());
      historyParams.set("subId", data.subId);
      historyParams.set("historyType", data.historyType);
      if (data.subId.length > 1) {
        historyParams.set("from", format(data.range.from, "yyyy-MM-dd"));
        historyParams.set("to", format(data.range.to, "yyyy-MM-dd"));
      } else {
        historyParams.set("from", "");
        historyParams.set("to", "");
      }

      return historyParams.toString();
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
            name="subId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="subId">
                  Subscription Id
                </FormLabel>
                <FormControl id="subId">
                  <Input
                    type="text"
                    required
                    placeholder="Enter subscription id..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="historyType"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="historyType">Crawl Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl id="historyType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a history type..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {historyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} HISTORY
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
              <FormItem className="flex flex-col mt-6">
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
                          form.watch("subId").length > 0 ? false : true
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
                      max={90}
                      defaultMonth={field.value?.from}
                      fromDate={startOfDay(subDays(new Date(), 89))}
                      toDate={new Date()}
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
          <Button type="submit" className="w-[120px] mt-4 capitalize" disabled={btnLoad}>
            {btnLoad ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};
