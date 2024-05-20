"use client";

import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Power } from "./icons/common";
import { CommonTooltip } from "./table/common";

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
    <CommonTooltip tip="Sign Out">
      <Button variant="destructive" onClick={handleSignOut} className="rounded-full px-3 py-1">
        <Power className="w-5 h-5" />
      </Button>
    </CommonTooltip>
  );
};
