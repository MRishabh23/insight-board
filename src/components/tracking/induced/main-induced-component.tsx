import { InducedForm } from "./induced-form";
import { InducedChart } from "./induced-chart";
import { InducedAccordion } from "@/components/utils/accord";

const MainInducedComponent = () => {
  return (
    <div className="flex flex-col">
      <InducedAccordion />
      <InducedForm />
      <InducedChart />
    </div>
  );
};

export default MainInducedComponent;
