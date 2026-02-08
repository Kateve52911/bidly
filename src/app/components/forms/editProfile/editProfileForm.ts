import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { UserData } from '../../../api/types/api.ts';
import { showURLError } from '../../../utils/helpers/forms/formError.ts';
import { fetchEditProfileFormData } from './editProfileFormData.ts';
import { updateProfile } from '../../../api/user/put/updateProfile.ts';
import { appendAlertAndRedirect } from '../../errorHandling/newAlert/appendAlertAndRedirect.ts';
import { UpdatedProfile } from '../../../api/user/types/updatedProfileTypes.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';

export function editProfileForm(userData: UserData): HTMLDivElement {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container my-lg-5 my-md-2';

  const row: HTMLDivElement = document.createElement('div');
  row.className = 'row';

  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.className = 'col-md-6 col-lg-8 mx-auto shadow-lg p-4';

  const form: HTMLFormElement = document.createElement('form');
  form.id = 'edit-listing-form';

  const editBioContainer: HTMLDivElement = document.createElement('div');
  editBioContainer.className = 'mb-3 text-left p-2';
  editBioContainer.appendChild(createLabel('Bio', 'bio'));
  editBioContainer.appendChild(
    createUserInput(userData.bio || '', 'text', 'bio', 'bio', false),
  );

  const editAvatarURLContainer: HTMLDivElement = document.createElement('div');
  editAvatarURLContainer.className = 'mb-3 text-left p-2';
  editAvatarURLContainer.id = 'avatar-url-div';
  editAvatarURLContainer.appendChild(createLabel('Avatar', 'image'));

  const editAvatarURLInput: HTMLInputElement = createUserInput(
    userData.avatar.url,
    'text',
    'avatarUrl',
    'avatarUrl',
    false,
  );

  editAvatarURLInput.addEventListener('blur', (): void => {
    showURLError('avatarUrl', 'avatar-url-div');
  });

  editAvatarURLContainer.appendChild(editAvatarURLInput);

  const editAvatarAltContainer: HTMLDivElement = document.createElement('div');
  editAvatarAltContainer.className = 'mb-3 text-left p-2';
  editAvatarAltContainer.appendChild(createLabel('Avatar Alt', 'image'));
  editAvatarAltContainer.appendChild(
    createUserInput(
      userData.avatar.alt,
      'text',
      'avatarAlt',
      'avatarAlt',
      false,
    ),
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

  form.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();
    const user: string = userData.name;
    const formData = new FormData(form);
    const updatedProfile: UpdatedProfile = fetchEditProfileFormData(formData);
    try {
      await updateProfile(user, updatedProfile);
      await appendAlertAndRedirect(
        'Successfully updated profile!',
        'success',
        '/profile.html',
      );
    } catch (error) {
      appendAlert(
        `Could not update profile ${(error as Error).message}`,
        'danger',
      );
    }
  });

  form.appendChild(editBioContainer);
  form.appendChild(editAvatarURLContainer);
  form.appendChild(editAvatarAltContainer);
  form.appendChild(alertContainer);
  form.appendChild(buttonContainer);

  container.append(formContainer);
  formContainer.appendChild(form);

  return container;
}
