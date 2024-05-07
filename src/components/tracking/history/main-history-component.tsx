import { HistoryForm } from "./history-form";
import { HistoryTable } from "./history-table";

const MainHistoryComponent = () => {
  return (
    <div className="flex flex-col">
      <HistoryForm />
      <HistoryTable />
    </div>
  );
};

export default MainHistoryComponent;
