import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { filterSearchResults } from '../../serachAndFilter/filterSearchResults.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';

export function renderSearchBar(listings: Array<Listing>) {
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

  searchInput.addEventListener('input', () => {
    filterSearchResults(listings);
  });

  const searchBarButton: HTMLButtonElement = document.createElement('button');
  searchBarButton.className = 'btn btn-success btn-sm';
  searchBarButton.id = 'search-bar-button';
  searchBarButton.innerHTML = '<i class="bi bi-search"></i>';

  // searchBarButton.addEventListener('click', filterSearchResults);

  const lineBreak: HTMLDivElement = document.createElement('hr');
  lineBreak.className = ' border-1 border-top border-dark pb-4';

  inputGroup.appendChild(searchInput);
  inputGroup.appendChild(searchBarButton);
  container.appendChild(inputGroup);
  container.appendChild(lineBreak);

  return container;
}
