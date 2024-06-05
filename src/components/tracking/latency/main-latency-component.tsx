import { LatencyAccordion } from "@/components/utils/accord";
import { LatencyForm } from "./latency-form";
import { LatencyTable } from "./latency-table";

const MainLatencyComponent = () => {
  return (
    <div className="flex flex-col">
      <LatencyAccordion />
      <LatencyForm />
      <LatencyTable />
    </div>
  );
};

export default MainLatencyComponent;
