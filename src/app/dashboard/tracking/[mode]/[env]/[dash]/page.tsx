"use client";

import React from "react";
//import { usePathname, useSearchParams } from "next/navigation";
import { useGetUsername } from "@/hooks/get-username";
import { CgSpinnerAlt } from "react-icons/cg";
import MainStatusComponent from "@/components/tracking/status/main-status-component";
import MainSummaryComponent from "@/components/tracking/summary/main-summary-component";

const SlugPage = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  const userData = useGetUsername();
  //const pathname = usePathname();
  //const searchParams = useSearchParams();

  if (userData.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (userData.isError || userData.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {userData.error?.message}</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4 bg-white text-primary rounded-md">
      {params.dash === "status" ? (
        <MainStatusComponent
          params={params}
          username={userData.data?.data?.user?.username}
        />
      ) : params.dash === "summary" ? (
        <MainSummaryComponent
          params={params}
          username={userData.data?.data?.user?.username}
        />
      ) : (
        <div>{params.dash}</div>
      )}
    </div>
  );
};

export default SlugPage;
