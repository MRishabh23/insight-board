import { LatencyForm } from "./latency-form";
import { LatencyTable } from "./latency-table";

const MainLatencyComponent = () => {
  return (
    <div className="flex flex-col">
      <LatencyForm />
      <LatencyTable />
    </div>
  );
};

export default MainLatencyComponent;