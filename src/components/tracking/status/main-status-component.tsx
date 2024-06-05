import { StatusAccordion } from "@/components/utils/accord";
import { CarrierStatus } from "./carrier-status";

const MainStatusComponent = () => {
  return (
    <div className="flex flex-col">
      <StatusAccordion />
      <CarrierStatus />
    </div>
  );
};

export default MainStatusComponent;
