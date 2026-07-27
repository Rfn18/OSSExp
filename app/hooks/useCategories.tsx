import useSWR from "swr";
import type { Category } from "../types/eventType";
import { ApiResponse } from "../types/api";

export function useCategories() {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse<Category[]>>("/event-categories");

  return {
    categories: response?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
