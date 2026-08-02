export type EventStatus = "completed" | "ongoing" | "upcoming" | "cancelled";

export interface EventFormValues {
  id: number;
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
  cover_image?: string;
  event_category_id: number;
}

export interface Event {
  id: number;
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
  cover_image?: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}
