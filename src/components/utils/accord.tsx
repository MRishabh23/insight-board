import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function CommonAccordion({ children }: { children: React.ReactNode }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-bold text-primary">Things to Remember</AccordionTrigger>
        <AccordionContent>
          <ul className="list-inside list-decimal text-base font-medium text-neutral-500">{children}</ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function IssueAccordion() {
  return (
    <CommonAccordion>
      <li>
        Initially active and closed issues will be fetched automatically. And this result will be cached for sometime.
      </li>
      <li>In case there are no active issues. You can create a new one, if there is one.</li>
      <li>By clicking more details button you can find additional details for the issue.</li>
      <li>By clicking the edit button you can update the issue.</li>
      <li>
        You can add Emails and Additional Links. If there are more than one, add them as comma separated. e.g.
        abc@xyz.com,def@xyz.com OR link1,link2
      </li>
      <li>
        Send Notification, Close, and Delete buttons will show an additional modal to confirm whether you want to
        proceed with the clicked option.
      </li>
      <li>
        Upon updating, sending notification, closing, and deleting the issue, if the process is successful the latest
        data will be fetched automatically in the background and will be shown on the page.
      </li>
    </CommonAccordion>
  );
}

export function StatusAccordion() {
  return (
    <CommonAccordion>
      <li>Initially current status and status history will be fetched automatically.</li>
      <li>In case there is a issue with any carrier. You can create a new status.</li>
      <li>The data will cached for sometime. In case you want latest data hit the refresh button.</li>
      <li>
        Upon creating, updating, closing, and deleting the status, if the process is successful the latest
        data will be fetched automatically in the background and will be shown on the page.
      </li>
    </CommonAccordion>
  );
}

export function SummaryAccordion() {
  return (
    <CommonAccordion>
      <li>Initially summary will be fetched for all the carriers for NORMAL queue automatically.</li>
      <li>All the request will be cached for sometime.</li>
      <li>Date range will only work with single carrier selection.</li>
    </CommonAccordion>
  );
}

export function HistoryAccordion() {
  return (
    <CommonAccordion>
      <li>Enter a subscription Id to see the history.</li>
      <li>By default all DIFF history will be shown.</li>
      <li>ALL history works on Date range.</li>
      <li>90 days range is available for subscriptions. But you can select only 15 days at max.</li>
    </CommonAccordion>
  );
}

export function LatencyAccordion() {
  return (
    <CommonAccordion>
      <li>Select a carrier to check latency.</li>
      <li>At max you can select 5 carriers.</li>
    </CommonAccordion>
  );
}

export function InducedAccordion() {
  return (
    <CommonAccordion>
      <li>Select a carrier the see induced latency.</li>
      <li>You can select multiple carriers at max 3.</li>
      <li>We have data from 16th August 2024 onwards, as all the previous data is removed because there are some discrepancies in that data.</li>
    </CommonAccordion>
  );
}

export function AllReferenceAccordion() {
  return (
    <CommonAccordion>
      <li>Select a carrier to check all the references.</li>
      <li>By default status will be ACTIVE. If status is CLOSED, reference type and queue options will be disabled.</li>
      <li>Reference type and queue option is mandatory in case of ACTIVE status.</li>
      <li>More info button will be associated with each reference to check all the details.</li>
    </CommonAccordion>
  );
}

export function SubscriptionAccordion() {
  return (
    <CommonAccordion>
      <li>Enter a subscription id to see the data.</li>
    </CommonAccordion>
  );
}

export function ReferenceAccordion() {
  return (
    <CommonAccordion>
      <li>Select a carrier and enter the reference id.</li>
      <li>This will bring all the subscriptions created for that reference in the carrier.</li>
    </CommonAccordion>
  );
}
