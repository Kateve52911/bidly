import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';
import { renderConfirmActionModal } from '../../../utils/helpers/modal/renderAlertModal.ts';
import { deleteListing } from '../../../api/listings/delete/deleteListing.ts';
import { appendAlertAndRedirect } from '../../errorHandling/newAlert/appendAlertAndRedirect.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { createEditListingCard } from '../../forms/editListing/createEditListingForm.ts';

export function createDashboardListingCard(data: Listing): HTMLDivElement {
  const { column, container, card } = createBaseListingCard(data);

  container.style.maxWidth = '300px';

  const buttonDiv: HTMLDivElement = document.createElement('div');
  buttonDiv.className =
    'd-flex flex-column flex-lg-row gap-3 justify-content-center p-2';

  const alertDiv: HTMLDivElement = document.createElement('div');
  alertDiv.id = 'alert-placeholder-container';

  const editButton: HTMLButtonElement = document.createElement('button');
  editButton.className = 'btn btn-outline-primary';
  editButton.textContent = 'Edit';
  editButton.id = 'editButton';

  editButton.addEventListener('click', () => {
    const userPostContainer: HTMLElement | null =
      document.getElementById('user-posts');
    console.log(userPostContainer);
    if (!userPostContainer) {
      return;
    }
    userPostContainer.innerHTML = '';
    const editForm: HTMLDivElement = createEditListingCard(data);
    userPostContainer.appendChild(editForm);
  });

  const deleteButton: HTMLButtonElement = document.createElement('button');
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.id = 'deleteButton';

  deleteButton.addEventListener('click', async (): Promise<void> => {
    try {
      await renderConfirmActionModal(
        'Are you sure you want to delete this listing?',
        'Delete listing',
        'Yep, delete!',
      );
      try {
        await deleteListing(data.id);
        await appendAlertAndRedirect(
          'Post successfully deleted',
          'success',
          '/profile.html',
        );
      } catch {
        appendAlert('Could not delete this listing', 'warning');
      }
    } catch {
      // User cancelled - no action needed
    }
  });

  buttonDiv.appendChild(alertDiv);
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);

  card.appendChild(buttonDiv);

  return column;
}
