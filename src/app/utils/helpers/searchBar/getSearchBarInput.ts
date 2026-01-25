export function fetchSearchBarInput(): string | null {
  const searchInput = document.getElementById(
    'search-input',
  ) as HTMLInputElement;
  const searchInputValue = searchInput.value;
  console.log(searchInputValue);
  return searchInputValue;
}
fetchSearchBarInput();
