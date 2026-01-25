import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { fetchSearchBarInput } from '../../../utils/helpers/searchBar/getSearchBarInput.ts';

export function renderSearchBar() {
  const container: HTMLDivElement = document.createElement('div');
  container.id = 'search-bar-container';
  container.className = 'container ms-4';

  const inputGroup: HTMLDivElement = document.createElement('div');
  inputGroup.className = 'search-bar input-group p-4 input-group-lg';

  const searchInput: HTMLInputElement = createUserInput(
    'Search listings ...',
    'text',
    'search-input',
    'search-input',
  );
  searchInput.className = 'form-control form-control-lg';

  const searchBarButton: HTMLButtonElement = document.createElement('button');
  searchBarButton.className = 'btn btn-success btn-sm';
  searchBarButton.id = 'search-bar-button';
  searchBarButton.innerHTML = '<i class="bi bi-search"></i>';

  searchBarButton.addEventListener('click', fetchSearchBarInput);

  const lineBreak: HTMLDivElement = document.createElement('hr');
  lineBreak.className = ' border-1 border-top border-dark pb-4';

  inputGroup.appendChild(searchInput);
  inputGroup.appendChild(searchBarButton);
  container.appendChild(inputGroup);
  container.appendChild(lineBreak);

  return container;
}
