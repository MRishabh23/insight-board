import MainHistoryComponent from "@/components/tracking/history/main-history-component";
import MainInducedComponent from "@/components/tracking/induced/main-induced-component";
import MainLatencyComponent from "@/components/tracking/latency/main-latency-component";
import MainReferenceComponent from "@/components/tracking/reference/main-reference-component";
import MainStatusComponent from "@/components/tracking/status/main-status-component";
import MainSummaryComponent from "@/components/tracking/summary/main-summary-component";

const SlugPage = ({
	params,
}: {
	params: { mode: string; env: string; dash: string };
}) => {
	if ((params.mode === "air" || params.mode === "terminal" || params.mode === "road") && params.dash === "induced") {
		return (
			<div className="mt-10 flex items-center justify-center font-semibold text-xl">
				Not available for AIR, TERMINAL, ROAD.
			</div>
		);
	}

	return (
		<div className="h-full w-full rounded-md bg-white p-4 text-primary">
			{params.dash === "status" ? (
				<MainStatusComponent />
			) : params.dash === "summary" ? (
				<MainSummaryComponent />
			) : params.dash === "history" ? (
				<MainHistoryComponent />
			) : params.dash === "latency" ? (
				<MainLatencyComponent mode={params.mode} />
			) : params.dash === "references" ? (
				<MainReferenceComponent />
			) : params.dash === "induced" ? (
				<MainInducedComponent />
			) : (
				<div>Coming soon...</div>
			)}
		</div>
	);
};

export default SlugPage;
