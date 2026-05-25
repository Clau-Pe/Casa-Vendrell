/**
 * Formatea un número como precio en euros
 * @param price - Precio en número
 * @returns String formateado: 12.5 → "12,50 €"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}