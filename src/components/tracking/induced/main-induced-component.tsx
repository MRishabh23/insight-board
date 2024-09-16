import { InducedAccordion } from "@/components/utils/accord";
import { InducedChart } from "./induced-chart";
import { InducedForm } from "./induced-form";

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
