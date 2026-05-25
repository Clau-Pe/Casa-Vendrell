import { apiGet, apiPost, apiPatch, apiDelete } from './client';
import type { Event, CreateEventDto, UpdateEventDto } from '../types/events';

/**
 * Obtiene todos los eventos
 */
export async function getEvents(): Promise<Event[]> {
  return apiGet<Event[]>('/events');
}

/**
 * Crea un nuevo evento (admin)
 */
export async function createEvent(
  data: CreateEventDto
): Promise<Event> {
  return apiPost<Event>('/events', data, true);
}

/**
 * Actualiza un evento (admin)
 */
export async function updateEvent(
  id: number,
  data: UpdateEventDto
): Promise<Event> {
  return apiPatch<Event>(`/events/${id}`, data, true);
}

/**
 * Elimina un evento (admin)
 */
export async function deleteEvent(id: number): Promise<void> {
  return apiDelete(`/events/${id}`, true);
}