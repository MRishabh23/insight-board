"use client";

import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { CarrierStatusTable } from "./carrier-status-table";
import { useParams } from "next/navigation";
import { ParamType } from "@/utils/types/common";
import { useStatusQuery } from "@/utils/query";
import { Button } from "@/components/ui/button";

export const CarrierStatus = () => {
  const params = useParams<ParamType>();

  const carrierStatusQuery = useStatusQuery(params);

  if (carrierStatusQuery.isPending) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (carrierStatusQuery.isError || carrierStatusQuery.error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {carrierStatusQuery.error?.message}</p>
      </div>
    );
  }

  if (carrierStatusQuery.data && !carrierStatusQuery.data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{carrierStatusQuery.data?.data}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-5">
        <Button onMouseDown={() => carrierStatusQuery.refetch()} disabled={carrierStatusQuery.isFetching}>
          {carrierStatusQuery.isFetching ? "Fetching..." : "Refresh"}
        </Button>
      </div>
      {carrierStatusQuery.isFetching ? (
        <div className="flex h-full flex-col items-center justify-center">
          <CgSpinnerAlt className="animate-spin text-lg" />
        </div>
      ) : (
        <CarrierStatusTable statusList={carrierStatusQuery.data || []} params={params} />
      )}
    </div>
  );
};
