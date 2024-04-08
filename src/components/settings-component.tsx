"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const SettingsComponent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const signOut = async () => {
    try {
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
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Avatar className={cn("cursor-pointer")}>
            <AvatarFallback className={cn("bg-white")}>
              <CircleUser className="text-primary" />
            </AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/profile">
          <DropdownMenuItem className={cn("cursor-pointer")}>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className={cn("cursor-pointer")}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsComponent;
