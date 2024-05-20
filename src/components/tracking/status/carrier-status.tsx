'use client';

import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { CarrierStatusTable } from "./carrier-status-table";
import { useParams } from "next/navigation";
import { ParamType } from "@/utils/types/common";
import { useStatusQuery } from "@/utils/query";

export const CarrierStatus = () => {
  const params = useParams<ParamType>();

  const carrierStatusQuery = useStatusQuery(params);

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
        <p className="text-red-500">
          Error: {carrierStatusQuery.error?.message}
        </p>
      </div>
    );
  }

  if (carrierStatusQuery.data && !carrierStatusQuery.data?.success) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">{carrierStatusQuery.data?.data}</p>
      </div>
    );
  }

  return (
    <div>
      <CarrierStatusTable
        statusList={carrierStatusQuery.data || []}
        params={params}
      />
    </div>
  );
};
