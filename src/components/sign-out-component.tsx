"use client";

import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignOutComponent = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const { data, success } = await signOutAction();
    if (!success) {
      toast.error(`Uh oh! Something went wrong, Sign out failed.`, {
        description: data,
      });
    } else {
      toast.success("Sign out successful");
      router.push("/signin");
    }
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
