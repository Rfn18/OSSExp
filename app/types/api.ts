export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    total: number;
    per_page: number;
  };
}
