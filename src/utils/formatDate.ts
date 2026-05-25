/**
 * Formatea una fecha según el idioma activo
 * @param dateString - Fecha en formato ISO "2026-05-15"
 * @param language - Idioma activo (es, ca, en, fr)
 * @returns String formateado según el idioma
 */
export function formatDate(dateString: string, language: string): string {
  const date = new Date(dateString);

  const localeMap: Record<string, string> = {
    es: 'es-ES',
    ca: 'ca-ES',
    en: 'en-GB',
    fr: 'fr-FR',
  };

  const locale = localeMap[language] ?? 'es-ES';

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}