import MainStatusComponent from "@/components/tracking/status/main-status-component";
import MainSummaryComponent from "@/components/tracking/summary/main-summary-component";
import MainHistoryComponent from "@/components/tracking/history/main-history-component";
import MainLatencyComponent from "@/components/tracking/latency/main-latency-component";
import MainReferenceComponent from "@/components/tracking/reference/main-reference-component";

const SlugPage = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  if (params.mode === "terminal") {
    return (
      <div className="flex justify-center items-center mt-10 text-xl font-semibold">
        Coming soon...
      </div>
    );
  }
  return (
    // <div className="h-full w-full p-4 bg-white text-primary rounded-md">
    //   {params.dash === "status" ? (
    //     <MainStatusComponent />
    //   ) : params.dash === "summary" ? (
    //     <MainSummaryComponent />
    //   ) : params.dash === "history" ? (
    //     <MainHistoryComponent />
    //   ) : params.dash === "latency" ? (
    //     <MainLatencyComponent />
    //   ) : params.dash === "references" ? (
    //     <MainReferenceComponent />
    //   ) : (
    //     <div>{params.dash}</div>
    //   )}
    // </div>
    <div className="h-full w-full p-4 bg-white text-primary rounded-md">
      {params.dash === "status" ? (
        <MainStatusComponent />
      ) : params.dash === "summary" ? (
        <MainSummaryComponent />
      ) : params.dash === "history" ? (
        <MainHistoryComponent />
      ) : params.dash === "latency" ? (
        <MainLatencyComponent />
      ) : (
        // ) : params.dash === "references" ? (
        //   <MainReferenceComponent />
        // ) : (
        <div>{params.dash}</div>
      )}
    </div>
  );
};

export default SlugPage;
