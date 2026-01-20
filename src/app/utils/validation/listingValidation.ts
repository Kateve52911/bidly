export function isValidDate(date: string): boolean {
  const bidEndingDate = new Date(date);
  const getTodaysDate = new Date();

  return bidEndingDate.getTime() > getTodaysDate.getTime();
}
