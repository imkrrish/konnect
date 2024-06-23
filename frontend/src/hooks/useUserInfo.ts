import { useQuery } from "@tanstack/react-query";
import { RefecthOptions } from "../types";
import AuthApi from "../api/authApi";

export function useUserInfo(options?: RefecthOptions) {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await AuthApi.getUser();
      return res.data;
    },
    ...options,
  });
}
