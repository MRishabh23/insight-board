import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { CarrierStatusTable } from "./carrier-status-table";
import { useParams } from "next/navigation";
import { ParamType } from "@/utils/types/ParamType";
import { useStatusQuery } from "@/utils/query";
import { UserContext } from "@/components/dashboard-layout-component";

export const CarrierStatus = () => {
  const params = useParams<ParamType>();
  const username = React.useContext(UserContext);
  
  const carrierStatusQuery = useStatusQuery(username || "", params);

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

  return (
    <div>
      <CarrierStatusTable
        statusList={carrierStatusQuery.data || []}
        params={params}
        username={username}
      />
    </div>
  );
};
