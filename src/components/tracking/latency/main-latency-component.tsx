import { LatencyAccordion } from "@/components/utils/accord";
import { LatencyForm } from "./latency-form";
import { LatencyTable } from "./latency-table";

const MainLatencyComponent = ({ mode }: { mode: string }) => {
	return (
		<div className="flex flex-col">
			<LatencyAccordion mode={mode} />
			<LatencyForm />
			<LatencyTable />
		</div>
	);
};

export default MainLatencyComponent;
