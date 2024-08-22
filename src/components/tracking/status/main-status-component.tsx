'use client';

import { StatusAccordion } from "@/components/utils/accord";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEditStatusDrawer } from "./create-edit-status-drawer";
import { StatusTable } from "./status-table";
import React from "react";

const MainStatusComponent = () => {
  const [tabVal, setTabVal] = React.useState("active");
  return (
    <div className="w-full">
      <div className="rounded-md bg-white p-4">
        <StatusAccordion />
      </div>
      <Tabs
        value={tabVal}
        onValueChange={(value) => {
          setTabVal(value);
        }}
        className="mt-4 flex h-full flex-col"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Current Status</TabsTrigger>
            <TabsTrigger value="closed">Status History</TabsTrigger>
          </TabsList>
          <CreateEditStatusDrawer
            variant="secondary"
            buttonTitle="New"
            title="Add a new status"
            issue="CREATE"
            tableType={tabVal.toUpperCase()}
          />
        </div>
        <TabsContent value="active" className="mb-6 mt-6 flex-1 rounded-md bg-white p-4 text-primary">
          <StatusTable type="active" />
        </TabsContent>
        <TabsContent value="closed" className="mb-6 mt-6 flex-1 rounded-md bg-white p-4 text-primary">
          <StatusTable type="closed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainStatusComponent;
