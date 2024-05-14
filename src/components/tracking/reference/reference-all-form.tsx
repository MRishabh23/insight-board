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
  getQueueList,
  getRefList,
} from "@/utils/pre-define-data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParamType, ReferenceAllFormType } from "@/utils/types/common";
import { useReferenceAllForm } from "@/utils/schema";

export const ReferenceAllForm = () => {
  const params = useParams<ParamType>();
  const carriersOptions = getCarriersList(params.mode);
  const queueOptions = getQueueList(params.mode);
  const refOptions = getRefList(params.mode);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [btnLoad, setBtnLoad] = React.useState(false);

  const form = useReferenceAllForm(searchParams);

  const onSubmit = (data: any) => {
    //console.log("submit data", data);
    setBtnLoad(true);
    if (data.carrier.length === 0) {
      form.setError("carrier", {
        type: "custom",
        message: "At least one carrier should be selected.",
      });
      setBtnLoad(false);
    } else {
      setTimeout(() => {
        const q = createQueryString(data);
        router.push(pathname + "?" + q);
        setBtnLoad(false);
      }, 1000);
    }
  };

  const createQueryString = React.useCallback(
    (data: ReferenceAllFormType) => {
      const referenceAllParams = new URLSearchParams(searchParams.toString());
      referenceAllParams.set("carrier", data.carrier);
      referenceAllParams.set("queue", data.queue);
      referenceAllParams.set("refType", data.refType);
      referenceAllParams.set("active", data.active);
      referenceAllParams.set("bucket", "");
      referenceAllParams.set("page", "1");

      return referenceAllParams.toString();
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
            name="carrier"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="carrier">Carrier</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl id="carrier">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a carrier..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {carriersOptions.map((option) => (
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
            name="active"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="active">Active</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl id="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a active..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="refType"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="refType">Reference Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl id="refType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reference type..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {refOptions.map((option) => (
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
