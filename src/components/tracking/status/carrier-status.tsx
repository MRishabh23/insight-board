import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { CarrierStatusTable } from "./carrier-status-table";

type StatusProps = {
  params: {
    mode: string;
    env: string;
    dash: string;
  };
  username: string;
};

const CarrierStatus = ({ params, username }: StatusProps) => {
  const carrierStatusQuery = useQuery({
    queryKey: ["carrier-status", `/dashboard/tracking/${params.mode}/${params.env}`],
    queryFn: async () => {
      const response = username !== "" && await axios({
        method: "post",
        url: "/api/tracking/status",
        data: {
          type: "GET_CARRIER_STATUS",
          username: username,
          env: params.env.toUpperCase(),
          mode: params.mode.toUpperCase(),
        },
      });
      return response;
    },
    staleTime: 1000 * 60 * 60 * 8,
    refetchInterval: 1000 * 60 * 60 * 8,
  });

  if (carrierStatusQuery.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (carrierStatusQuery.isError || carrierStatusQuery.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {carrierStatusQuery.error?.message}</p>
      </div>
    );
  }
  return (
    <div>
      <CarrierStatusTable statusList={carrierStatusQuery.data || []} params={params} username={username}/>
    </div>
  );
};

export default CarrierStatus;
