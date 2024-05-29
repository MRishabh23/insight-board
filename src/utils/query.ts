// dashboard queries

import { useQuery } from "@tanstack/react-query";
import { ParamType } from "./types/common";
import {
  getReferenceAction,
  getReferenceAllAction,
  getReferenceInfoAction,
  getReferenceSubscriptionAction,
} from "@/actions/reference-actions";
import {
  getFetchHistoryAction,
  getHistoryAction,
} from "@/actions/history-actions";
import {
  getInducedAction,
  getLatencyAction,
} from "@/actions/latency-induced-actions";
import {
  getStatusAction,
  getSummaryAction,
} from "@/actions/status-summary-actions";
import { getIssueAction } from "@/actions/issue-actions";

// issue query
export const useIssueQuery = (status: string) => {
  const query = useQuery({
    queryKey: ["issue", "PROD", status],
    queryFn: async () => {
      const response = await getIssueAction({
        status: status,
      });
      return response;
    },
    staleTime: 1000 * 60 * 60 * 8,
  });

  return query;
};

// status query
export const useStatusQuery = (params: ParamType) => {
  const query = useQuery({
    queryKey: ["status", `${params.mode}`, `${params.env}`],
    queryFn: async () => {
      const response = await getStatusAction(params);
      return response;
    },
    staleTime: 1000 * 60 * 60 * 8,
  });

  return query;
};

// summary query
export const useSummaryQuery = (
  params: ParamType,
  newCarrOpt: string[],
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "summary",
      `${params.mode}`,
      `${params.env}`,
      newCarrOpt,
      `${searchParams.get("queue")}`,
      `${searchParams.get("from") || ""}`,
      `${searchParams.get("to") || ""}`,
    ],
    queryFn: async () => {
      const response = await getSummaryAction({
        env: params.env,
        mode: params.mode,
        carriers: newCarrOpt,
        queue: searchParams.get("queue"),
        startTime: searchParams.get("from") || "",
        endTime: searchParams.get("to") || "",
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// history query
export const useHistoryQuery = (params: ParamType, searchParams: any) => {
  const query = useQuery({
    queryKey: [
      "history",
      `${params.mode}`,
      `${params.env}`,
      `${searchParams.get("subId")}`,
      `${searchParams.get("historyType")}`,
      `${searchParams.get("from")}`,
      `${searchParams.get("to")}`,
    ],
    queryFn: async () => {
      const response = await getHistoryAction({
        env: params.env,
        mode: params.mode,
        subscriptionId: searchParams.get("subId").toUpperCase(),
        historyType: searchParams.get("historyType"),
        startTime: searchParams.get("from") || "",
        endTime: searchParams.get("to") || "",
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// history fetch query
export const useHistoryFetchQuery = (
  params: ParamType,
  schedulerId: string,
  resourceId: string
) => {
  const query = useQuery({
    queryKey: [
      "history-fetch",
      `${params.mode}`,
      `${params.env}`,
      `${schedulerId}`,
      `${resourceId}`,
    ],
    queryFn: async () => {
      const response = await getFetchHistoryAction({
        env: params.env,
        mode: params.mode,
        resourceId: resourceId,
      });
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return query;
};

// latency fetch query
export const useLatencyQuery = (
  params: ParamType,
  newCarrOpt: string[],
  searchParams: any
) => {
  const query = useQuery({
    queryKey: [
      "latency",
      `${params.mode}`,
      `${params.env}`,
      newCarrOpt,
      `${searchParams.get("queue")}`,
      `${searchParams.get("refType")}`,
    ],
    queryFn: async () => {
      const response = await getLatencyAction({
        env: params.env,
        mode: params.mode,
        carriers: newCarrOpt,
        queue: searchParams.get("queue"),
        referenceType: searchParams.get("refType"),
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// reference all query
export const useReferenceAllQuery = (params: ParamType, searchParams: any) => {
  const query = useQuery({
    queryKey: [
      "reference-all",
      `${params.mode}`,
      `${params.env}`,
      `${searchParams.get("category")}`,
      `${searchParams.get("carrier")}`,
      `${searchParams.get("queue")}`,
      `${searchParams.get("refType")}`,
      `${searchParams.get("refStatus")}`,
      `${searchParams.get("bucket")}`,
    ],
    queryFn: async () => {
      const response = await getReferenceAllAction({
        env: params.env,
        mode: params.mode,
        carrier: searchParams.get("carrier"),
        queue: searchParams.get("queue"),
        referenceType: searchParams.get("refType"),
        refStatus: searchParams.get("refStatus"),
        bucket: searchParams.get("bucket"),
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// reference info query
export const useReferenceInfoQuery = (
  params: ParamType,
  searchParams: any,
  reference: string
) => {
  const query = useQuery({
    queryKey: [
      "reference-info",
      `${params.mode}`,
      `${params.env}`,
      `${reference}`,
      `${searchParams.get("carrier")}`,
      `${searchParams.get("refType")}`,
      `${searchParams.get("refStatus")}`,
    ],
    queryFn: async () => {
      const response = await getReferenceInfoAction({
        env: params.env,
        mode: params.mode,
        carrier: searchParams.get("carrier"),
        referenceType: searchParams.get("refType"),
        refStatus: searchParams.get("refStatus"),
        reference: reference,
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// reference query
export const useReferenceQuery = (
  params: ParamType,
  category: string,
  referenceId: string
) => {
  const query = useQuery({
    queryKey: [
      "reference-reference",
      `${params.mode}`,
      `${params.env}`,
      `${category}`,
      `${referenceId}`,
    ],
    queryFn: async () => {
      const response = await getReferenceAction({
        env: params.env,
        mode: params.mode,
        referenceId: referenceId,
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// reference subscription query
export const useReferenceSubscriptionQuery = (
  params: ParamType,
  category: string,
  subscriptionId: string
) => {
  const query = useQuery({
    queryKey: [
      "reference-subscription",
      `${params.mode}`,
      `${params.env}`,
      `${category}`,
      `${subscriptionId}`,
    ],
    queryFn: async () => {
      const response = await getReferenceSubscriptionAction({
        env: params.env,
        mode: params.mode,
        subscriptionId: subscriptionId,
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};

// induced query
export const useInducedQuery = (
  params: ParamType,
  newCarrOpt: string[],
  year: string,
  months: string[]
) => {
  const query = useQuery({
    queryKey: [
      "summary",
      `${params.mode}`,
      `${params.env}`,
      newCarrOpt,
      year,
      months,
    ],
    queryFn: async () => {
      const response = await getInducedAction({
        env: params.env,
        mode: params.mode,
        carriers: newCarrOpt,
        year: year,
        months: months,
      });
      return response;
    },
    staleTime: 1000 * 60 * 30,
  });

  return query;
};
