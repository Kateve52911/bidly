export function fetchSearchBarInput(): string | null {
  const searchInput = document.getElementById(
    'search-input',
  ) as HTMLInputElement;
  return searchInput.value;
}
