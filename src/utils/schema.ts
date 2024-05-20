import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusType } from "./types/common";
import { format } from "date-fns";

// current and previous dates
const sD = new Date();
sD.setDate(sD.getDate() - 1);
const eD = new Date();


// auth schema

// combine signUp and forgot/reset
export const authSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: "Username must be at least 6 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

export const useAuthForm = () => {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return form;
};

// dashboards schema

// status
const statusFormSchema = z.object({
  carrier: z.string(),
  status: z.string(),
});

export const useStatusForm = (item: StatusType) => {
  const form = useForm<z.infer<typeof statusFormSchema>>({
    resolver: zodResolver(statusFormSchema),
    defaultValues: {
      carrier: item.carrier,
      status: item.status.toLowerCase(),
    },
  });

  return form;
};

// summary
const summaryOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const summaryFormSchema = z.object({
  carriers: z
    .array(summaryOptionSchema)
    .max(5, "Please select up to 5 carriers"),
  queue: z.string(),
  range: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

export const useSummaryForm = (newCarrOpt: any, searchParams: any) => {
  const form = useForm<z.infer<typeof summaryFormSchema>>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      carriers: newCarrOpt,
      queue: searchParams.get("queue") || "NORMAL",
      range: {
        from: new Date(searchParams.get("from") || format(sD, "yyyy-MM-dd")),
        to: new Date(searchParams.get("to") || format(eD, "yyyy-MM-dd")),
      },
    },
  });

  return form;
};

// history schema
const historyFormSchema = z.object({
  subId: z.string(),
  historyType: z.string(),
  range: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

export const useHistoryForm = (searchParams: any) => {
  const form = useForm<z.infer<typeof historyFormSchema>>({
    resolver: zodResolver(historyFormSchema),
    defaultValues: {
      subId: searchParams.get("subId") || "",
      historyType: searchParams.get("historyType") || "DIFF",
      range: {
        from: new Date(searchParams.get("from") || format(sD, "yyyy-MM-dd")),
        to: new Date(searchParams.get("to") || format(eD, "yyyy-MM-dd")),
      },
    },
  });

  return form;
};

// latency schema
const latencyOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const latencyFormSchema = z.object({
  carriers: z
    .array(latencyOptionSchema)
    .max(5, "Please select up to 5 carriers"),
  queue: z.string(),
  refType: z.string(),
});

export const useLatencyForm = (newCarrOpt: any, searchParams: any) => {
  const form = useForm<z.infer<typeof latencyFormSchema>>({
    resolver: zodResolver(latencyFormSchema),
    defaultValues: {
      carriers: newCarrOpt,
      queue: searchParams.get("queue") || "NORMAL",
      refType: searchParams.get("refType") || "ALL",
    },
  });

  return form;
};

// reference schema
const referenceAllFormSchema = z.object({
  carrier: z.string(),
  queue: z.string(),
  refType: z.string(),
  refStatus: z.string(),
});

export const useReferenceAllForm = (searchParams: any) => {
  const form = useForm<z.infer<typeof referenceAllFormSchema>>({
    resolver: zodResolver(referenceAllFormSchema),
    defaultValues: {
      carrier: searchParams.get("carrier") || "",
      queue: searchParams.get("queue") || "NORMAL",
      refType: searchParams.get("refType") || "BOOKING",
      refStatus: searchParams.get("refStatus") || "ACTIVE",
    },
  });

  return form;
};

const referenceFormSchema = z.object({
  carrier: z.string(),
  reference: z.string()
});

export const useReferenceForm = (searchParams: any) => {
  const form = useForm<z.infer<typeof referenceFormSchema>>({
    resolver: zodResolver(referenceFormSchema),
    defaultValues: {
      carrier: searchParams.get("carrier") || "",
      reference: searchParams.get("reference") || "",
    },
  });

  return form;
};

const referenceSubscriptionFormSchema = z.object({
  subscriptionId: z.string(),
});

export const useReferenceSubscriptionForm = (searchParams: any) => {
  const form = useForm<z.infer<typeof referenceSubscriptionFormSchema>>({
    resolver: zodResolver(referenceSubscriptionFormSchema),
    defaultValues: {
      subscriptionId: searchParams.get("subscriptionId") || "",
    },
  });

  return form;
};
