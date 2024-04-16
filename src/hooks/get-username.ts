import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useGetUsername = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["all-routes", "user-details"],
    queryFn: async () => {
      const response = await axios.get("/api/users/me");
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  // if (path === "profile") {
  //   return { isPending, data, isError, error };
  // }

  //const username = data?.data?.user?.username; 
  return { isPending, data, isError, error };
};
