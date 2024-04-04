import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/users/me");
      return response;
    },
  });

  return { isPending, data, isError, error };
};
