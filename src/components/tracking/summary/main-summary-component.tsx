import { SummaryAccordion } from "@/components/utils/accord";
import { SummaryForm } from "./summary-form";
import { SummaryTable } from "./summary-table";

const MainSummaryComponent = () => {
  return (
    <div className="flex flex-col">
      <SummaryAccordion />
      <SummaryForm />
      <SummaryTable />
    </div>
  );
};

export default MainSummaryComponent;
