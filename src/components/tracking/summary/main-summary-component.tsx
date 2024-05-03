import React from "react";
import { SummaryForm } from "./summary-form";
import { SummaryTable } from "./summary-table";

const MainSummaryComponent = () => {
  return (
    <div className="flex flex-col">
      <SummaryForm />
      <SummaryTable />
    </div>
  );
};

export default MainSummaryComponent;
