export interface NewsletterSubscriber {
  id: number;
  email: string;
  created_at?: string;
}

export interface SubscribeNewsletterDto {
  email: string;
}