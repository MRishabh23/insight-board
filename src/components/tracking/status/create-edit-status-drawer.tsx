"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getCarriersList } from "@/utils/pre-define-data/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIssueForm } from "@/utils/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIssueCUMutation } from "@/utils/mutation";
import { ParamType } from "@/utils/types/common";
import { useParams } from "next/navigation";

export function CreateEditStatusDrawer({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const handleSheetOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex items-center justify-center">
      <Sheet open={open} onOpenChange={handleSheetOpen}>
        <SheetTrigger asChild>
          <Button variant={props.variant}>{props.buttonTitle}</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{props.title}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="my-scroll mt-5 w-full">
            <AddStatusForm
              issue={props.issue}
              tableType={props.tableType}
              issueKey={props.issueKey}
              issueValue={props.issueValue}
              setOpen={setOpen}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const AddStatusForm = ({ ...props }) => {
  const form = useIssueForm(props.issue, props.issueValue);
  const params = useParams<ParamType>();

  const carrierOptions = React.useMemo(() => getCarriersList(params.mode), [params.mode]);

  const { mutate: server_CUIssue, isPending: isPending_CUIssue } = useIssueCUMutation(
    form,
    props.issue,
    props.issueKey,
    props.tableType,
    props.setOpen,
  );

  const onSubmit = (data: any) => {
    if (!data.mode) {
      form.setError("mode", {
        type: "custom",
        message: "Please select a mode.",
      });
    }
    if (data.mode !== "all" && !data.carrier) {
      form.setError("carrier", {
        type: "custom",
        message: "Please select a carrier.",
      });
    }
    if (!data.status) {
      form.setError("status", {
        type: "custom",
        message: "Please select a status.",
      });
    }
    if (!data.severity) {
      form.setError("severity", {
        type: "custom",
        message: "Please select a severity.",
      });
    }
    if (data.mode && data.status && data.severity && data.issue && data.impact && data.resolution) {
      //console.log("submit data", data);
      server_CUIssue(data);
    }
  };

  const handleReset = () => {
    form.reset({
      env: params.env.toUpperCase(),
      mode: "",
      carrier: "",
      status: "ACTIVE",
      severity: "",
      issue: "",
      description: "",
      polling_frequency: 1,
      default_emails: "yes",
      emails: "",
      additional_links: "",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 rounded-md border border-gray-200 p-3">
          <FormField
            control={form.control}
            name="env"
            render={() => (
              <FormItem>
                <FormLabel className="text-base" htmlFor="env">
                  Environment
                </FormLabel>
                <FormControl id="env">
                  <Input type="text" value={params.env.toUpperCase()} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode"
            render={() => (
              <FormItem>
                <FormLabel className="text-base" htmlFor="mode">
                  Mode
                </FormLabel>
                <FormControl id="mode">
                  <Input type="text" value={params.mode.toUpperCase()} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carrier"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="carrier">
                  Carrier
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={props.issue === "CREATE" ? false : true}
                >
                  <FormControl id="carrier">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a carrier..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {carrierOptions.map((option) => (
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
            name="status"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="status">
                  Status
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl id="status">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="CLOSED">CLOSED</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statusType"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="statusType">
                  Status Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl id="statusType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status type..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEGRADATION">DEGRADATION</SelectItem>
                    <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                    <SelectItem value="OUTAGE">OUTAGE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issue"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="issue">
                  Issue
                </FormLabel>
                <FormControl id="issue">
                  <Textarea className="h-24" placeholder="issue..." required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="impact"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="impact">
                  Impact
                </FormLabel>
                <FormControl id="impact">
                  <Textarea className="h-24" placeholder="impact..." required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resolution"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="resolution">
                  Resolution
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl id="resolution">
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
                    <SelectItem value="TESTING">TESTING</SelectItem>
                    <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {props.issue === "CREATE" && (
            <>
              <Button type="submit" className="mt-4 w-full" disabled={isPending_CUIssue}>
                {isPending_CUIssue ? "Creating..." : "Create"}
              </Button>
              <Button type="button" onMouseDown={handleReset} className="mt-4 w-full">
                Reset
              </Button>
            </>
          )}
          {props.issue === "EDIT" && (
            <Button type="submit" className="mt-4 w-full" disabled={isPending_CUIssue}>
              {isPending_CUIssue ? "Updating..." : "Update"}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
