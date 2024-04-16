import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { CarrierStatusTable } from "./carrier-status-table";

type StatusProps = {
  params: {
    mode: string;
    env: string;
  };
  username: string;
};

const CarrierStatus = ({ params, username }: StatusProps) => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["carrier-status", `/dashboard/tracking/${params.mode}/${params.env}`],
    queryFn: async () => {
      const response = username !== "" && await axios({
        method: "post",
        url: "/api/tracking/status",
        data: {
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

  if (isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (isError || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }
  return (
    <div>
      {/* <pre className="text-balance">${JSON.stringify(data)}</pre> */}
      <CarrierStatusTable statusList={data || []}/>
    </div>
  );
};

export default CarrierStatus;
