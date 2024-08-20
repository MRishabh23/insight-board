"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCarriersList, getYearList } from "@/utils/pre-define-data/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector from "@/components/multi-select";
import { InducedFormType, ParamType } from "@/utils/types/common";
import { useInducedForm } from "@/utils/schema";

export const InducedForm = () => {
  const params = useParams<ParamType>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const carriersOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);
  const yearOptions = React.useMemo(() => getYearList(), []);
  const [btnLoad, setBtnLoad] = React.useState(false);
  const queryCarriers = React.useMemo(
    () => (searchParams.get("carriers") ? searchParams.get("carriers")?.split(",") : []),
    [searchParams],
  );

  let newCarrOpt: any = [];

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

  const form = useInducedForm(newCarrOpt, searchParams);

  const onSubmit = (data: any) => {
    //console.log("submit data", data);
    setBtnLoad(true);
    if (data.carriers.length === 0) {
      form.setError("carriers", {
        type: "custom",
        message: "Select at least one carrier.",
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
      if (data.carriers.length > 0) {
        data.carriers.map((carrier: any, index: number) => {
          if (index === data.carriers.length - 1) {
            carrStr += carrier.value;
          } else {
            carrStr += carrier.value + ",";
          }
        });
      }

      const inducedParams = new URLSearchParams(searchParams.toString());
      if (carrStr !== "") {
        inducedParams.set("carriers", carrStr);
      } else {
        inducedParams.set("carriers", "");
      }

      inducedParams.set("year", data.year);

      return inducedParams.toString();
    },
    [searchParams],
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 rounded-md border border-gray-200 p-3">
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
                    maxSelected={3}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button type="submit" className="mt-4 w-[120px] capitalize" disabled={btnLoad}>
            {btnLoad ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};
