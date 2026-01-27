import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
//import { deleteListing } from '../../../api/listings/delete/deleteListing.ts';

export function createDashboardListingCard(data: Listing) {
  const { column, card } = createBaseListingCard(data);

  const buttonDiv = document.createElement('div');
  buttonDiv.className =
    'd-flex flex-column flex-lg-row gap-3 justify-content-center p-3';

  const alertDiv = document.createElement('div');
  alertDiv.id = 'alert-placeholder-container';

  const editButton: HTMLButtonElement = document.createElement('button');
  editButton.className = 'btn btn-outline-primary';
  editButton.textContent = 'Edit';
  editButton.id = 'editButton';

  const deleteButton: HTMLButtonElement = document.createElement('button');
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.id = 'deleteButton';

  deleteButton.addEventListener('click', () => {
    appendAlert('Are you sure you want to delete this listing?', 'warning');
    //deleteListing(data.id);
  });

  buttonDiv.appendChild(alertDiv);
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  card.appendChild(buttonDiv);

  return column;
}
