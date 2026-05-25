import { apiPost } from './client';
import type { NewsletterSubscriber, SubscribeNewsletterDto } from '../types/newsletter';

/**
 * Suscribe un email al newsletter
 */
export async function subscribeNewsletter(
  data: SubscribeNewsletterDto
): Promise<NewsletterSubscriber> {
  return apiPost<NewsletterSubscriber>('/newsletter', data);
}