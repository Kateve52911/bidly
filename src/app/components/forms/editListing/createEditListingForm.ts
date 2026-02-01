import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { getEditFormData } from '../../listings/updateListing/editedFormData.ts';
import { UpdatedListingData } from '../../../api/listings/put/types/updatedListingData.ts';
import { updateListing } from '../../../api/listings/put/updateListing.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { appendAlertAndRedirect } from '../../errorHandling/newAlert/appendAlertAndRedirect.ts';
import { showURLError } from '../../../utils/helpers/forms/formError.ts';

export function createEditListingCard(data: Listing) {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container my-lg-5 my-md-2';

  const row: HTMLDivElement = document.createElement('div');
  row.className = 'row';

  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.className = 'col-md-6 col-lg-8 mx-auto shadow-lg p-4';

  const form: HTMLFormElement = document.createElement('form');
  form.id = 'edit-listing-form';

  const editTitleContainer: HTMLDivElement = document.createElement('div');
  editTitleContainer.className = 'mb-3 text-left p-2';
  editTitleContainer.appendChild(createLabel('Title', 'title'));
  editTitleContainer.appendChild(
    createUserInput(data.title, 'text', 'title', 'title', false),
  );

  const editDescriptionContainer: HTMLDivElement =
    document.createElement('div');
  editDescriptionContainer.className = 'mb-3 text-left p-2';
  editDescriptionContainer.appendChild(
    createLabel('Description', 'description'),
  );
  editDescriptionContainer.appendChild(
    createUserInput(
      data.description,
      'text',
      'description',
      'description',
      false,
    ),
  );

  const editImageURLContainer: HTMLDivElement = document.createElement('div');
  editImageURLContainer.className = 'mb-3 text-left p-2';
  editImageURLContainer.id = 'image-url-div';
  editImageURLContainer.appendChild(createLabel('Image', 'image'));

  const editImageURLInput = createUserInput(
    data.media[0].url,
    'text',
    'imageUrl',
    'imageUrl',
    false,
  );

  editImageURLInput.addEventListener('blur', () => {
    showURLError('imageUrl', 'image-url-div');
  });

  editImageURLContainer.appendChild(editImageURLInput);

  const editAltImageAltContainer: HTMLDivElement =
    document.createElement('div');
  editAltImageAltContainer.className = 'mb-3 text-left p-2';
  editAltImageAltContainer.appendChild(createLabel('Image Alt', 'image'));
  editAltImageAltContainer.appendChild(
    createUserInput(data.media[0].alt, 'text', 'imageAlt', 'imageAlt', false),
  );

  const alertContainer: HTMLDivElement = document.createElement('div');
  alertContainer.id = 'alert-placeholder-container';

  const buttonContainer: HTMLDivElement = document.createElement('div');
  buttonContainer.className = 'row';

  const saveButton: HTMLDivElement = document.createElement('div');
  saveButton.className = 'd-grid col-md-6 mt-3 btn-outline-success';
  saveButton.id = 'submit-button-new-listing';
  saveButton.appendChild(createSubmitButton('Save'));

  const cancelButton: HTMLButtonElement = document.createElement('button');
  cancelButton.className = 'd-grid col-md-6 mt-3 btn btn-danger';
  cancelButton.id = 'cancel-button-new-listing';
  cancelButton.type = 'button';
  cancelButton.innerHTML = 'Cancel';

  cancelButton.addEventListener('click', () => {
    window.location.href = '/profile';
  });

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const listingId = data.id;
    const formData = new FormData(form);
    const updatedData: UpdatedListingData = getEditFormData(formData);
    console.log('updated data', updatedData);
    try {
      await updateListing(listingId, updatedData);
      await appendAlertAndRedirect(
        'Successfully updated listing',
        'success',
        '/profile.html',
      );
    } catch (error) {
      appendAlert(`Error: ${error.message}`, 'danger');
    }
  });

  form.appendChild(editTitleContainer);
  form.appendChild(editDescriptionContainer);
  form.appendChild(editImageURLContainer);
  form.appendChild(editAltImageAltContainer);
  form.appendChild(alertContainer);
  form.appendChild(buttonContainer);

  container.append(formContainer);
  formContainer.appendChild(form);

  return container;
}
