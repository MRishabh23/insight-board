"use client";

import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duel-split";
import { cn } from "@/lib/utils";
import React from "react";
import AuthForm from "@/components/auth-form";

const Forgot = () => {
  return (
    <DuelSplit>
      <DuelSplitSection className={cn("1lg:flex hidden bg-black")}>
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <AuthForm
          title="Reset password"
          postRoute="forgot"
          pushRoute="/signin"
        />
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default Forgot;
