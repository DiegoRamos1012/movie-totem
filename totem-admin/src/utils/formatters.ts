import { format, parse, isValid } from "date-fns";

export const date = new Date();

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  if (!isValid(d)) return ""; 
  return format(d, "dd/MM/yyyy");
}

export function parseDisplayToDate(display: string): Date | undefined {
  const d = parse(display, "dd/MM/yyyy", new Date());
  return isValid(d) ? d : undefined;
}

export function formatDigitsToDisplay(digits: string): string {
  const cleaned = digits.replace(/\D/g, "").slice(0, 8);
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
}
