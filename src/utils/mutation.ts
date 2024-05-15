import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInType, SubmitType, StatusType, ParamType } from "./types/common";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// auth mutations

// combine mutation for signUp and forgot/reset
export const useAuthSubmitMutation = (
  form: any,
  title: string,
  postRoute: string,
  pushRoute: string
) => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: (data: SubmitType) => {
      return axios({
        method: "post",
        url: `/api/users/${postRoute}`,
        data: data,
      });
    },
    onSuccess: () => {
      toast.success(`${title} Successful.`);
      form.reset({ username: "", password: "" });
      router.push(pushRoute);
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, ${title} failed.`, {
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
      });
    },
  });

  return submit;
};

// mutation for signIn
export const useSignInSubmitMutation = (form: any) => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: (data: SignInType) => {
      return axios({
        method: "post",
        url: "/api/users/signin",
        data: data,
      });
    },
    onSuccess: () => {
      toast.success("Sign In Successful.");
      form.reset({ role: "user", username: "", password: "" });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, Sign in failed.`, {
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
      });
    },
  });

  return submit;
};

// mutation for signOut
export const useSignOutSubmitMutation = () => {
  const router = useRouter();
  const submit = useMutation({
    mutationFn: () => {
      return axios({
        method: "get",
        url: "/api/users/signout",
      });
    },
    onSuccess: () => {
      toast.success("Sign out successful");
      router.push("/signin");
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, Sign out failed.`, {
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
      });
    },
  });

  return submit;
};

// dashboard mutations

// status mutation
export const useStatusMutation = (
  username: string,
  params: ParamType,
  setOpen: any
) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: (data: StatusType) => {
      return axios({
        method: "post",
        url: "/api/tracking/status",
        data: {
          type: "UPDATE_CARRIER_STATUS",
          username: username,
          env: params.env.toUpperCase(),
          mode: params.mode.toUpperCase(),
          carrier: data.carrier,
          status: data.status,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "carrier-status",
          `/dashboard/tracking/${params.mode}/${params.env}/status`,
        ],
      });
      toast.success("Carrier status updated successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, while updating status.`, {
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
      });
    },
  });

  return submit;
};
