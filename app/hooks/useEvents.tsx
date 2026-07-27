import useSWR from "swr";
import type { ApiResponse } from "../types/api";
import type { EventFormValues } from "../types/eventType";

export function useEvents(params?: { status?: string; category_id?: string }) {
  const queryParams = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const key = queryParams ? `/events?${queryParams}` : "/events";

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse<EventFormValues[]>>(key);

  return {
    events: response?.data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useEvent(slug: string | null) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<ApiResponse<EventFormValues>>(
    slug ? `/events/${slug}` : null,
  );

  return {
    event: response?.data ?? null,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
