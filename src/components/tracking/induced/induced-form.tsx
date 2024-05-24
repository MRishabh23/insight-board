"use client";

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
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  getCarriersList,
  getMonthList,
  getYearList,
} from "@/utils/pre-define-data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/multi-select";
import { InducedFormType, ParamType } from "@/utils/types/common";
import { useInducedForm } from "@/utils/schema";

export const InducedForm = () => {
  const params = useParams<ParamType>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const carriersOptions = React.useMemo(
    () => getCarriersList(params.mode),
    [params.mode]
  );
  const monthsOptions = React.useMemo(
    () => getMonthList(searchParams.get("year")!),
    [searchParams]
  );
  const yearOptions = React.useMemo(() => getYearList(), []);
  const [btnLoad, setBtnLoad] = React.useState(false);
  const queryCarriers = React.useMemo(
    () =>
      searchParams.get("carriers")
        ? searchParams.get("carriers")?.split(",")
        : [],
    [searchParams]
  );
  const queryMonths = React.useMemo(
    () =>
      searchParams.get("months") ? searchParams.get("months")?.split(",") : [],
    [searchParams]
  );

  let newCarrOpt: any = [];
  let newMonthOpt: any = [];

  if (queryCarriers !== undefined && queryCarriers.length > 0) {
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

  if (queryMonths !== undefined && queryMonths.length > 0) {
    queryMonths.map((month) => {
      if (month) {
        const monthObj = {
          label: month,
          value: month,
        };
        newMonthOpt.push(monthObj);
      }
    });
  }

  const form = useInducedForm(newCarrOpt, newMonthOpt, searchParams);

  const onSubmit = (data: any) => {
    //console.log("submit data", data);
    setBtnLoad(true);
    if (data.carriers.length === 0 && data.months.length === 0) {
      form.setError("carriers", {
        type: "custom",
        message: "Select at least one carrier.",
      });
      form.setError("months", {
        type: "custom",
        message: "Select at least one month.",
      });
      setBtnLoad(false);
    } else if (data.carriers.length === 0) {
      form.setError("carriers", {
        type: "custom",
        message: "Select at least one carrier.",
      });
      setBtnLoad(false);
    } else if (data.months.length === 0) {
      form.setError("months", {
        type: "custom",
        message: "Select at least one month.",
      });
      setBtnLoad(false);
    } else {
      setTimeout(() => {
        const q = createQueryString(data);
        router.push(pathname + "?" + q);
        setBtnLoad(false);
      }, 700);
    }
  };

  const createQueryString = React.useCallback(
    (data: InducedFormType) => {
      let carrStr = "";
      let monStr = "";
      if (data.carriers.length > 0) {
        data.carriers.map((carrier: any, index: number) => {
          if (index === data.carriers.length - 1) {
            carrStr += carrier.value;
          } else {
            carrStr += carrier.value + ",";
          }
        });
      }
      if (data.months.length > 0) {
        data.months.map((month: any, index: number) => {
          if (index === data.months.length - 1) {
            monStr += month.value;
          } else {
            monStr += month.value + ",";
          }
        });
      }
      const inducedParams = new URLSearchParams(searchParams.toString());
      if (carrStr !== "") {
        inducedParams.set("carriers", carrStr);
      } else {
        inducedParams.set("carriers", "");
      }

      if (monStr !== "") {
        inducedParams.set("months", monStr);
      } else {
        inducedParams.set("months", "");
      }

      inducedParams.set("year", data.year);

      return inducedParams.toString();
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
              <FormItem aria-required>
                <FormLabel htmlFor="carriers">Carriers</FormLabel>
                <FormControl id="carriers">
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={carriersOptions}
                    placeholder="Select Carriers you like..."
                    hidePlaceholderWhenSelected
                    maxSelected={form.watch("months").length > 1 ? 1 : 3}
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
            name="year"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="year">Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl id="year">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a year..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {yearOptions.map((option) => (
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
            name="months"
            render={({ field }) => (
              <FormItem aria-required className="mt-4">
                <FormLabel htmlFor="months">Months</FormLabel>
                <FormControl id="months">
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={monthsOptions}
                    placeholder="Select months you like..."
                    hidePlaceholderWhenSelected
                    maxSelected={form.watch("carriers").length > 1 ? 1 : 3}
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
          <Button
            type="submit"
            className="w-[120px] mt-4 capitalize"
            disabled={btnLoad}
          >
            {btnLoad ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};
