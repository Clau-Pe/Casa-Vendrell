// ===========================
// CONFIGURACIÓN DE CONTACTO
// ===========================

export const CONTACT = {
  whatsapp: {
    primary: '+34634938879',
    secondary: ['+34617175169', '+34634280204'],
    // Mensaje predefinido — modificar aquí cuando se defina
    defaultMessage: 'Hola! Me gustaría hacer una reserva en Casa Vèndrell.',
  },
  email: {
    reservations: 'reservas.casavendrell@gmail.com',
    secondary: 'cuatrouvassl@gmail.com',
  },
} as const;

// ===========================
// LINKS GENERADOS
// ===========================

/**
 * Genera el link de WhatsApp para reservas
 * @param message - Mensaje personalizado (opcional)
 */
export function getWhatsAppLink(message?: string): string {
  const text = message ?? CONTACT.whatsapp.defaultMessage;
  return `https://wa.me/${CONTACT.whatsapp.primary.replace(/\s/g, '')}?text=${encodeURIComponent(text)}`;
}

/**
 * Genera el link de email para consultoría
 * Añade el email secundario en copia automáticamente
 */
export function getConsultoriaMailLink(): string {
  const subject = encodeURIComponent('Consultoría — Casa Vèndrell');
  const cc = encodeURIComponent(CONTACT.email.secondary);
  return `mailto:${CONTACT.email.reservations}?subject=${subject}&cc=${cc}`;
}