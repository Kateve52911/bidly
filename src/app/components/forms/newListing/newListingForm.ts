import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { createImageInputGroup } from '../../../utils/helpers/forms/createImageInputGroup.ts';
import {
  clearURLError,
  showURLError,
} from '../../../utils/helpers/forms/formError.ts';

export function createNewListingForm(): HTMLDivElement {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container my-lg-5 my-md-2';

  const row: HTMLDivElement = document.createElement('div');
  row.className = 'row';

  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.className = 'col-md-6 col-lg-8 mx-auto shadow-lg p-4';

  const title: HTMLHeadingElement = document.createElement('h2');
  title.textContent = 'Create a new listing';
  title.className = 'mb-3 text-primary text-center';

  const info: HTMLParagraphElement = document.createElement('p');
  info.className = 'mb-3 text-center p-2';
  info.textContent = 'Create a listing for you item! ';

  formContainer.append(title);
  formContainer.append(info);

  const form: HTMLFormElement = document.createElement('form');
  form.id = 'new-listing-form';

  const titleContainer: HTMLDivElement = document.createElement('div');
  titleContainer.className = 'mb-3 text-left p-2';
  titleContainer.appendChild(createLabel('Title', 'title'));
  titleContainer.appendChild(
    createUserInput('Title of your listing', 'text', 'title', 'title'),
  );

  const descriptionContainer: HTMLDivElement = document.createElement('div');
  descriptionContainer.className = 'mb-3 text-left p-2';
  descriptionContainer.appendChild(createLabel('Description', 'description'));
  descriptionContainer.appendChild(
    createUserInput(
      'Description of you listing',
      'text',
      'description',
      'description',
    ),
  );

  const imageURLContainer: HTMLDivElement = document.createElement('div');
  imageURLContainer.className = 'mb-3 text-left p-2';
  imageURLContainer.id = 'image-url-div';
  imageURLContainer.appendChild(createLabel('Image', 'image'));

  const imageURLInput = createUserInput(
    'Image URL (https://...)',
    'text',
    'imageUrl',
    'imageUrl',
  );

  imageURLInput.addEventListener('blur', () => {
    showURLError('imageUrl', 'image-url-div');
  });

  imageURLInput.addEventListener('input', (): void => {
    clearURLError('imageUrl', 'image-url-div');
  });
  imageURLContainer.appendChild(imageURLInput);

  const imageAltContainer: HTMLDivElement = document.createElement('div');
  imageAltContainer.className = 'mb-3 text-left p-2';
  imageAltContainer.appendChild(createLabel('Image Alt', 'image'));
  imageAltContainer.appendChild(
    createUserInput('Image Alt text', 'text', 'imageAlt', 'imageAlt'),
  );

  const additionalImagesContainer: HTMLDivElement =
    document.createElement('div');
  additionalImagesContainer.id = 'additional-images-container';
  additionalImagesContainer.className = 'mb-3';

  const addImageButton: HTMLButtonElement = document.createElement('button');
  addImageButton.type = 'button';
  addImageButton.className = 'btn btn-outline-primary btn-sm';
  addImageButton.textContent = '+ Add Another Image';
  addImageButton.addEventListener('click', (): void => {
    const imageIndex: number = additionalImagesContainer.children.length;
    const newImageGroup: HTMLDivElement = createImageInputGroup(imageIndex);
    additionalImagesContainer.appendChild(newImageGroup);
  });

  const currentDate: string = new Date().toISOString().slice(0, 16);

  const dateContainer: HTMLDivElement = document.createElement('div');
  dateContainer.className = 'mb-3 text-left p-2';
  dateContainer.appendChild(
    createLabel('Choose when your listing ends:', 'date'),
  );
  dateContainer.appendChild(
    createUserInput(
      'Choose end date',
      'datetime-local',
      'endingDate',
      'endingDate',
      true,
      currentDate,
    ),
  );

  const alertContainer: HTMLDivElement = document.createElement('div');
  alertContainer.id = 'alert-placeholder-container';

  const submitButton: HTMLDivElement = document.createElement('div');
  submitButton.className = 'd-grid mt-3 liveAlertBtn';
  submitButton.id = 'submit-button-new-listing';
  submitButton.appendChild(createSubmitButton('Create Listing!'));

  form.appendChild(titleContainer);
  form.appendChild(descriptionContainer);
  form.appendChild(imageURLContainer);
  form.appendChild(imageAltContainer);
  form.appendChild(imageURLContainer);
  form.appendChild(imageAltContainer);
  form.appendChild(additionalImagesContainer);
  form.appendChild(addImageButton);
  form.appendChild(dateContainer);
  form.appendChild(alertContainer);
  form.appendChild(submitButton);

  container.append(formContainer);
  formContainer.appendChild(form);

  return container;
}
