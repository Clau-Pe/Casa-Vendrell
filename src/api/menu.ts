import { apiGet, apiPost, apiPatch, apiDelete } from './client';
import type { MenuItem, CreateMenuItemDto, UpdateMenuItemDto } from '../types/menu';

/**
 * Obtiene todos los ítems de la carta
 */
export async function getMenu(): Promise<MenuItem[]> {
  return apiGet<MenuItem[]>('/menu');
}

/**
 * Crea un nuevo ítem de la carta (admin)
 */
export async function createMenuItem(
  data: CreateMenuItemDto
): Promise<MenuItem> {
  return apiPost<MenuItem>('/menu', data, true);
}

/**
 * Actualiza un ítem de la carta (admin)
 */
export async function updateMenuItem(
  id: number,
  data: UpdateMenuItemDto
): Promise<MenuItem> {
  return apiPatch<MenuItem>(`/menu/${id}`, data, true);
}

/**
 * Elimina un ítem de la carta (admin)
 */
export async function deleteMenuItem(id: number): Promise<void> {
  return apiDelete(`/menu/${id}`, true);
}