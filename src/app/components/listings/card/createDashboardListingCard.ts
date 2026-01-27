import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';

export function createDashboardListingCard(data: Listing) {
  const { column, card } = createBaseListingCard(data);

  const buttonDiv = document.createElement('div');
  buttonDiv.className =
    'd-flex flex-column flex-lg-row gap-3 justify-content-center p-3';

  const editButton: HTMLButtonElement = document.createElement('button');
  editButton.className = 'btn btn-outline-primary';
  editButton.textContent = 'Edit';
  editButton.id = 'editButton';

  const deleteButton: HTMLButtonElement = document.createElement('button');
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.id = 'deleteButton';

  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  card.appendChild(buttonDiv);

  return column;
}
