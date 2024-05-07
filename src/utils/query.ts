// dashboard queries

import { useQuery } from "@tanstack/react-query";
import { ParamType } from "./types/ParamType";
import axios from "axios";

// status query
export const useStatusQuery = (username: string, params: ParamType) => {
  const query = useQuery({
    queryKey: [
      "carrier-status",
      `/dashboard/tracking/${params.mode}/${params.env}/status`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        (await axios({
          method: "post",
          url: "/api/tracking/status",
          data: {
            type: "GET_CARRIER_STATUS",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 60 * 8,
    refetchInterval: 1000 * 60 * 60 * 8,
  });

  return query;
};

// summary query
export const useSummaryQuery = (
  username: string,
  params: ParamType,
  newCarrOpt: any,
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "summary",
      `/dashboard/tracking/${params.mode}/${params.env}/summary`,
      `${searchParams.get("carriers")}-${searchParams.get(
        "queue"
      )}-${searchParams.get("from")}-${searchParams.get("to")}`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        (await axios({
          method: "post",
          url: "/api/tracking/summary",
          data: {
            type: "GET_SUMMARY",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            carriers: newCarrOpt,
            queue: searchParams.get("queue"),
            startTime: searchParams.get("from") || "",
            endTime: searchParams.get("to") || "",
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  });

  return query;
};
