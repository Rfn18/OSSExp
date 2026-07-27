export type EventStatus = "completed" | "ongoing" | "upcoming" | "cancelled";

export interface EventFormValues {
  title: string;
  slug: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  link: string;
  status: EventStatus;
  is_repeat: boolean;
  event_category_id: string;
}

export interface Category {
  id: string;
  name: string;
}
