export function isValidDate(date: string): boolean {
  const bidEndingDate = new Date(date);
  const currentDate = new Date();

  return bidEndingDate.getTime() > currentDate.getTime();
}
