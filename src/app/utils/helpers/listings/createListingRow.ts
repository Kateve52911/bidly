export function createListingRow(): HTMLDivElement {
  const row: HTMLDivElement = document.createElement('div');
  row.classList = 'row justify-content-center ms-5';
  return row;
}
