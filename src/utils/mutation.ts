import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInType, SubmitType } from "./types/AuthType";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { StatusType } from "./types/DashboardType";
import { ParamType } from "./types/ParamType";

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
    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, ${title} failed.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        toast.success(`${title} Successful.`);
        form.reset({ username: "", password: "" });
        router.push(pushRoute);
      }
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
    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, Sign in failed.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        toast.success("Sign In Successful.");
        form.reset({ role: "user", username: "", password: "" });
        router.push("/dashboard");
      }
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
        url: "/api/users/signout"
      });
    },
    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, Sign out failed.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        toast.success('Sign out successful');
        router.push("/signin");
      }
    },
  });

  return submit;
};

// dashboard mutations

// status mutation
export const useStatusMutation = (username: string, params: ParamType) => {
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

    onSettled: async (_, error: any) => {
      if (error) {
        toast.error(`Uh oh! Something went wrong, while updating status.`, {
          description: error?.response?.data?.error
            ? error?.response?.data?.error
            : error.message,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: [
            "carrier-status",
            `/dashboard/tracking/${params.mode}/${params.env}/status`,
          ],
        });
        toast.success("Carrier status updated successfully!");
      }
    },
  });

  return submit;
};
