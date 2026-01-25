import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';

export function renderSearchBar() {
  const container: HTMLDivElement = document.createElement('div');
  container.id = 'search-bar-container';
  container.className = 'container ms-4 flex-wrap';

  const searchBar: HTMLDivElement = document.createElement('div');
  searchBar.className = 'search-bar p-4';

  const searchInput: HTMLInputElement = createUserInput(
    'Search listings ...',
    'search',
    'search-input',
    'search-input',
  );
  searchInput.className = 'form-control form-control-lg';

  const lineBreak: HTMLDivElement = document.createElement('hr');
  lineBreak.className = ' border-1 border-top border-dark pb-4';

  searchBar.appendChild(searchInput);
  container.appendChild(searchBar);
  container.appendChild(lineBreak);

  return container;
}
