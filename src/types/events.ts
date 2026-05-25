export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  image_url?: string;
  created_at?: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
  time: string;
  image_url?: string;
}

export type UpdateEventDto = Partial<CreateEventDto>;