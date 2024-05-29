"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEditIssueDrawer } from "./create-edit-issue-drawer";
import { IssueTable } from "./issue-table";
import React from "react";

const Issue = () => {
  const [tabVal, setTabVal] = React.useState("active");
  return (
    <div className="h-full w-full">
      <Tabs
        value={tabVal}
        onValueChange={(value) => {
          setTabVal(value);
        }}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">ACTIVE</TabsTrigger>
            <TabsTrigger value="closed">CLOSED</TabsTrigger>
          </TabsList>
          <CreateEditIssueDrawer
            variant="secondary"
            buttonTitle="New Issue"
            title="Add a new issue"
            issue="CREATE"
            tableType={tabVal.toUpperCase()}
          />
        </div>
        <TabsContent value="active" className="flex-1">
          <div className="h-full w-full my-5 p-4 bg-white text-primary rounded-md">
            <IssueTable type="active" />
          </div>
        </TabsContent>
        <TabsContent value="closed" className="flex-1">
          <div className="h-full w-full my-5 p-4 bg-white text-primary rounded-md">
            <IssueTable type="closed" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Issue;
