import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEditIssueDrawer } from "./create-edit-issue-drawer";
import { IssueTable } from "./issue-table";

const Issue = () => {
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="active" className="h-full flex flex-col">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">ACTIVE</TabsTrigger>
            <TabsTrigger value="closed">CLOSED</TabsTrigger>
          </TabsList>
          <CreateEditIssueDrawer
            variant="secondary"
            buttonTitle="New"
            title="Add a new issue"
            issue="CREATE"
          />
        </div>
        <TabsContent value="active" className="flex-1">
          <IssueTable type="active" />
        </TabsContent>
        <TabsContent value="closed" className="flex-1">
          <IssueTable type="closed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Issue;
