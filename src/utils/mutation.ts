import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthType, ParamType, IssueValueInternal, StatusValueInternal } from "./types/common";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetAction, signInAction, signUpAction } from "@/actions/auth-actions";
import { closeStatusAction, createUpdateStatusAction, deleteStatusAction } from "@/actions/status-summary-actions";
import { closeIssueAction, createUpdateIssueAction, deleteNotifyIssueAction } from "@/actions/issue-actions";

// auth mutations

// mutation for signUp
export const useSignUpSubmitMutation = (form: any) => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: async (data: AuthType) => await signUpAction(data),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong, Sign up failed.`, {
          description: data.data,
        });
      } else {
        form.reset({ username: "", password: "" });
        toast.success("Sign up Successful.");
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, Sign up failed.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// mutation for signIn
export const useSignInSubmitMutation = (form: any) => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: async (data: AuthType) => await signInAction(data),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong, Sign in failed.`, {
          description: data.data,
        });
      } else {
        form.reset({ username: "", password: "" });
        toast.success("Sign In Successful.");
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, Sign in failed.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// mutation for reset
export const useResetSubmitMutation = (form: any) => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: async (data: AuthType) => await resetAction(data),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong, while resetting.`, {
          description: data.data,
        });
      } else {
        form.reset({ username: "", password: "" });
        toast.success("Reset password Successful.");
        router.push("/signin");
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, while resetting.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// issue mutation

// create/update issue mutation
export const useIssueCUMutation = (form: any, issue: string, issueKey: string, tableType: string, setOpen: any) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (data: IssueValueInternal) =>
      await createUpdateIssueAction({
        ...data,
        type: issue,
        issueKey: issueKey,
      }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        if (issue === "CREATE") {
          await queryClient.invalidateQueries({
            queryKey: ["issue", "PROD", tableType],
          });
          toast.success("Issue created successfully.");
          form.reset({
            env: "PROD",
            mode: "",
            carrier: "",
            status: "ACTIVE",
            severity: "",
            issue: "",
            description: "",
            polling_frequency: 1,
            default_emails: "yes",
            emails: "",
            additional_links: "",
          });
          setOpen(false);
        } else {
          await queryClient.invalidateQueries({
            queryKey: ["issue", "PROD", tableType],
          });
          toast.success("Issue updated Successfully.");
          setOpen(false);
        }
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// close issue mutation
export const useCloseIssueMutation = (form: any, setOpen: any) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (issueKey: string) => await closeIssueAction({ issueKey: issueKey }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["issue", "PROD", "ACTIVE"],
        });
        toast.success("Issue closed successfully.");
        form.reset({ issueKey: "" });
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// delete notify issue mutation
export const useDeleteNotifyIssueMutation = (mutateType: string, form: any, tableType: string, setOpen: any) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (issueKey: string) => await deleteNotifyIssueAction({ type: mutateType, issueKey: issueKey }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["issue", "PROD", tableType],
        });
        if (mutateType === "DELETE") {
          toast.success("Issue deleted successfully.");
        } else {
          toast.success("Notification sent successfully.");
        }
        form.reset({ issueKey: "" });
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// dashboard mutations

// status mutation

// create/update issue mutation
export const useStatusCUMutation = (
  params: ParamType,
  form: any,
  state: string,
  statusKey: string,
  tableType: string,
  setOpen: any,
) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (data: StatusValueInternal) =>
      await createUpdateStatusAction({
        ...data,
        type: state,
        statusKey: statusKey,
      }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        if (state === "CREATE") {
          await queryClient.invalidateQueries({
            queryKey: ["status", params.env, params.mode, tableType],
          });
          toast.success("Status created successfully.");
          form.reset({
            env: params.env.toUpperCase(),
            mode: params.mode.toUpperCase(),
            carrier: "",
            status: "ACTIVE",
            statusType: "",
            issue: "",
            impact: "",
            rca: "",
            expectedResolutionDate: new Date(),
            resolution: "IN-PROGRESS",
          });
          setOpen(false);
        } else {
          await queryClient.invalidateQueries({
            queryKey: ["status", params.env, params.mode, tableType],
          });
          toast.success("Status updated Successfully.");
          setOpen(false);
        }
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// close status mutation
export const useCloseStatusMutation = (form: any, setOpen: any, params: ParamType, carrier: string) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (d: any) =>
      await closeStatusAction({
        env: params.env,
        mode: params.mode,
        carrier: carrier,
        rca: d.rca,
        statusKey: d.statusKey,
      }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["status", params.env, params.mode, "ACTIVE"],
        });
        toast.success("Status closed successfully.");
        form.reset({ statusKey: "" });
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};

// delete status mutation
export const useDeleteStatusMutation = (
  form: any,
  setOpen: any,
  params: ParamType,
  carrier: string,
  tableType: string,
) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (statusKey: string) =>
      await deleteStatusAction({ env: params.env, mode: params.mode, carrier: carrier, statusKey: statusKey }),
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong.`, {
          description: data.data,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["status", params.env, params.mode, tableType],
        });
        toast.success("Status deleted successfully.");
        form.reset({ statusKey: "" });
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong.`, {
        description: error.message,
      });
    },
  });

  return submit;
};
