"use client";

import {
  DuelSplit,
  DuelSplitTitle,
  DuelSplitSection,
} from "@/components/duelSplit";
import { cn } from "@/lib/utils";
import React from "react";
import AuthForm from "@/components/authForm";

const SignIn = () => {
  return (
    <DuelSplit>
      <DuelSplitSection className={cn("1lg:flex hidden bg-black")}>
        <DuelSplitTitle>JUSTRANSFORM</DuelSplitTitle>
      </DuelSplitSection>
      <DuelSplitSection>
        <AuthForm
          title="Sign in"
          switchTitle="SignUp"
          switchRoute="signup"
          postRoute="signin"
          pushRoute="/"
        />
      </DuelSplitSection>
    </DuelSplit>
  );
};

export default SignIn;
