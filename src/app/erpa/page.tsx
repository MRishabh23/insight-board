"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { useUser } from "@/hooks/getUser";
import { cn } from "@/lib/utils";

const Erpa = () => {
  const [btnLoad, setBtnLoad] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { isPending, data, isError, error } = useUser();

  const signOut = async () => {
    try {
      setBtnLoad(true);
      await axios.get("/api/users/signout");
      toast({
        description: "Sign out Successful.",
      });
      router.push("/signin");
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong, Sign out failed.",
        description: error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message,
        variant: "destructive",
      });
    } finally {
      setBtnLoad(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <p>ERPA Dashboard</p>
      {isPending ? (
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      ) : isError || error ? (
        <p className={cn("text-red-500")}>Error: {error?.message}</p>
      ) : (
        <p>{data?.data?.user?.username}</p>
      )}
      <Button
        variant={"destructive"}
        onClick={signOut}
        disabled={btnLoad ? true : false}
      >
        {btnLoad ? (
          <>
            <CgSpinnerAlt className="animate-spin text-lg mr-2" /> Sign Out
          </>
        ) : (
          "Sign Out"
        )}
      </Button>
    </div>
  );
};

export default Erpa;
