import { InducedForm } from "./induced-form";
import { InducedChart } from "./induced-chart";

const MainInducedComponent = () => {
  return (
    <div className="flex flex-col">
      <InducedForm />
      <InducedChart />
    </div>
  );
};

export default MainInducedComponent;
