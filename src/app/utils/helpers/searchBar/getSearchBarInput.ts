export function fetchSearchBarInput(): string | null {
  const searchInput = document.getElementById(
    'search-input',
  ) as HTMLInputElement;
  const searchInputValue: string = searchInput.value;
  console.log(searchInputValue);
  return searchInputValue;
}
