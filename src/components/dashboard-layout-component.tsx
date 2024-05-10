"use client";

import { useGetUsername } from "@/utils/query";
import React from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DashboardProps } from "@/app/dashboard/layout";

export const UserContext = React.createContext(null);

const DashboardLayoutComponent = ({ children }: Readonly<DashboardProps>) => {
  const userData = useGetUsername();

  if (userData.isPending) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <CgSpinnerAlt className="animate-spin text-lg mr-2" />
      </div>
    );
  }
  if (userData.isError || userData.error) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {userData.error?.message}</p>
      </div>
    );
  }
  return (
    <UserContext.Provider value={userData.data?.data?.user?.username}>
      <div className="h-full flex flex-col bg-primary text-primary-foreground">
        <Header />
        <>
          <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
        </>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default DashboardLayoutComponent;
