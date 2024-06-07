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

export function CreateEditIssueDrawer({ ...props }) {
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
            <AddIssueForm
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

const AddIssueForm = ({ ...props }) => {
  const form = useIssueForm(props.issue, props.issueValue);

  const transportMode = form.watch("mode");

  const carrierOptions = React.useMemo(() => getCarriersList(transportMode), [transportMode]);

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
    if (!data.carrier) {
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
    if (
      data.mode &&
      data.carrier &&
      data.status &&
      data.severity &&
      data.issue &&
      data.description &&
      data.polling_frequency
    ) {
      data.polling_frequency = parseInt(data.polling_frequency);
      //console.log("submit data", data);
      server_CUIssue(data);
    }
  };

  const handleReset = () => {
    form.reset({
      env: "PROD",
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
                  <Input type="text" value="PROD" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="mode">
                  Mode
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={props.issue === "CREATE" ? false : true}
                >
                  <FormControl id="mode">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mode..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="air">AIR</SelectItem>
                    <SelectItem value="ocean">OCEAN</SelectItem>
                    <SelectItem value="terminal">TERMINAL</SelectItem>
                  </SelectContent>
                </Select>
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
            name="severity"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="severity">
                  Severity
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl id="severity">
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="CRITICAL">CRITICAL</SelectItem>
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
                  <Textarea className="h-24" placeholder="Type issue..." required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="description">
                  Description
                </FormLabel>
                <FormControl id="description">
                  <Textarea className="h-36" placeholder="Describe issue..." required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="polling_frequency"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="polling_frequency">
                  Polling Frequency
                </FormLabel>
                <FormControl id="polling_frequency">
                  <Input
                    type="number"
                    value={+field.value}
                    onChange={(e) => {
                      field.onChange(+e.target.value);
                    }}
                    min={1}
                    max={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="default_emails"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="default_emails">
                  Default Emails
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl id="default_emails">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose whether to include default emails..." />
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
            name="emails"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="emails">
                  Emails
                </FormLabel>
                <FormControl id="emails">
                  <Input type="text" placeholder="Enter emails..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additional_links"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-base" htmlFor="additional_links">
                  Additional Links
                </FormLabel>
                <FormControl id="additional_links">
                  <Input type="text" placeholder="Enter additional links..." {...field} />
                </FormControl>
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
