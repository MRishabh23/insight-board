"use client";

import React, { createContext } from "react";
import { useGetUsername } from "@/hooks/get-username";
import { CgSpinnerAlt } from "react-icons/cg";
import MainStatusComponent from "@/components/tracking/status/main-status-component";
import MainSummaryComponent from "@/components/tracking/summary/main-summary-component";
import MainHistoryComponent from "@/components/tracking/history/main-history-component";

export const UserContext = createContext(null);

const SlugPage = ({
  params,
}: {
  params: { mode: string; env: string; dash: string };
}) => {
  const userData = useGetUsername();

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
      <UserContext.Provider value={userData.data?.data?.user?.username}>
        {params.dash === "status" ? (
          <MainStatusComponent />
        ) : params.dash === "summary" ? (
          <MainSummaryComponent />
        ) : params.dash === "history" ? (
          <MainHistoryComponent />
        ) : (
          <div>{params.dash}</div>
        )}
      </UserContext.Provider>
    </div>
  );
};

export default SlugPage;
