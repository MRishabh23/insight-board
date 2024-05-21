import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthType, StatusType, ParamType } from "./types/common";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  resetAction,
  signInAction,
  signUpAction,
  updateStatusAction,
} from "@/app/actions";

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

// dashboard mutations

// status mutation
export const useStatusMutation = (params: ParamType, setOpen: any) => {
  const queryClient = useQueryClient();
  const submit = useMutation({
    mutationFn: async (data: StatusType) =>
      await updateStatusAction({
        env: params.env,
        mode: params.mode,
        carrier: data.carrier,
        status: data.status,
      }),

    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(`Uh oh! Something went wrong, while updating status.`, {
          description: data.data,
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["status", `${params.mode}`, `${params.env}`],
        });
        toast.success("Carrier status updated successfully!");
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(`Uh oh! Something went wrong, while updating status.`, {
        description: error.message,
      });
    },
  });

  return submit;
};
