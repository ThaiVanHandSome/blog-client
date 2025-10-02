"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import { MeResponse } from "@/types/auth.type";
import { DataResponse } from "@/types/http.type";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
    isError,
    isSuccess,
    isFetching
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<MeResponse> => {
      const result = await fetchApi<DataResponse<MeResponse>>({
        url: API_ENDPOINTS.AUTH.ME,
        method: "GET",
        showToastWhenSuccess: false,
        showToastWhenError: false
      });
      return result.data;
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true
  });

  const clearAuthCache = () => {
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  };

  return {
    user,
    isLoading,
    error,
    refetch,
    isError,
    isSuccess,
    isFetching,
    clearAuthCache,
    isAuthenticated: !!user
  };
};
