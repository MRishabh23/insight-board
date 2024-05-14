// dashboard queries

import { useQuery } from "@tanstack/react-query";
import { ParamType } from "./types/common";
import axios from "axios";

// user query

export const useGetUsername = () => {
  const query = useQuery({
    queryKey: ["all-routes", "user-details"],
    queryFn: async () => {
      const response = await axios.get("/api/users/me");
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return query;
};

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

// history query
export const useHistoryQuery = (
  username: string,
  params: ParamType,
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "history",
      `/dashboard/tracking/${params.mode}/${params.env}/history`,
      `${searchParams.get("subId")}-${searchParams.get(
        "historyType"
      )}-${searchParams.get("from")}-${searchParams.get("to")}`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        (await axios({
          method: "post",
          url: "/api/tracking/history",
          data: {
            type: "GET_REFERENCE_HISTORY",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            subscriptionId: searchParams.get("subId").toUpperCase(),
            historyType: searchParams.get("historyType"),
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

// history fetch query
export const useHistoryFetchQuery = (
  username: string,
  params: ParamType,
  schedulerId: string,
  resourceId: string
) => {
  const query = useQuery({
    queryKey: [
      "history-fetch",
      `${params.mode}-${params.env}-${schedulerId}-${resourceId}`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        (await axios({
          method: "post",
          url: "/api/tracking/historyfetch",
          data: {
            type: "FETCH_REFERENCE_HISTORY",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            resourceId: resourceId
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return query;
};

// latency fetch query
export const useLatencyQuery = (
  username: string,
  params: ParamType,
  newCarrOpt: any,
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "latency",
      `/dashboard/tracking/${params.mode}/${params.env}/latency`,
      `${searchParams.get("carriers")}-${searchParams.get(
        "queue"
      )}-${searchParams.get("refType")}`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        newCarrOpt.length > 0 &&
        (await axios({
          method: "post",
          url: "/api/tracking/latency",
          data: {
            type: "GET_LATENCY",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            carriers: newCarrOpt,
            queue: searchParams.get("queue"),
            referenceType: searchParams.get("refType")
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  });

  return query;
};

// reference all query
export const useReferenceAllQuery = (
  username: string,
  params: ParamType,
  newCarrOpt: any,
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "reference-all",
      `/dashboard/tracking/${params.mode}/${params.env}/references`,
      `${searchParams.get("carriers")}-${searchParams.get(
        "queue"
      )}-${searchParams.get("refType")}-${searchParams.get("active")}-${searchParams.get("bucket")}-${searchParams.get("page")}`,
    ],
    queryFn: async () => {
      const response =
        username !== null &&
        username !== "" &&
        newCarrOpt.length > 0 &&
        (await axios({
          method: "post",
          url: "/api/tracking/reference",
          data: {
            type: "GET_REFERENCE_LIST",
            username: username,
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            carriers: newCarrOpt,
            queue: searchParams.get("queue"),
            referenceType: searchParams.get("refType"),
            active: searchParams.get("active"),
            bucket: searchParams.get("bucket"),
            page: searchParams.get("page"),
            category: searchParams.get("category")
          },
        }));
      return response;
    },
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  });

  return query;
};
