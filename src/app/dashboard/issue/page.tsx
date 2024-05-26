import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IssueDrawer } from "./issue-drawer";

const Issue = () => {
  return (
    <div>
      <Tabs defaultValue="active">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">ACTIVE</TabsTrigger>
            <TabsTrigger value="closed">CLOSED</TabsTrigger>
          </TabsList>
          <IssueDrawer
            variant="secondary"
            buttonTitle="Create Issue"
            title="ISSUE"
          />
        </div>
        <TabsContent value="active">
          <div>Active...</div>
        </TabsContent>
        <TabsContent value="closed">
          <div>Closed...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Issue;
