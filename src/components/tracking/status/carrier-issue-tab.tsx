import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarrierIssueComponent } from "./carrier-issue";

export function CarrierIssueTab() {
  return (
    <Tabs defaultValue="current" className="w-[300px] sm:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="current">Current Issues</TabsTrigger>
        <TabsTrigger value="past">Past Issues</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <CarrierIssueComponent issue="current" />
      </TabsContent>
      <TabsContent value="past">
        <CarrierIssueComponent issue="past" />
      </TabsContent>
    </Tabs>
  );
}
