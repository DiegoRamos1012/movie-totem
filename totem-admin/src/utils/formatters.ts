export function formatDate(date: Date | string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // retorna vazio se a data for inválida

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
