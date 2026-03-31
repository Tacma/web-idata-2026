import type { Language } from '../types';

const monthsES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

const monthsEN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a date string to a localized string
 * @param dateString - ISO date string (e.g., '2024-03-15')
 * @param language - Language code ('es' or 'en')
 * @param includeDay - Whether to include the day of the month
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  language: Language,
  includeDay = false
): string {
  const date = new Date(dateString);
  const months = language === 'es' ? monthsES : monthsEN;
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (includeDay) {
    const day = date.getDate();
    return language === 'es'
      ? `${day} de ${month} de ${year}`
      : `${month} ${day}, ${year}`;
  }

  return language === 'es'
    ? `${month} de ${year}`
    : `${month} ${year}`;
}
