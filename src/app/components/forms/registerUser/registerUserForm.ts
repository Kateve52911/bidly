import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { register } from '../../../api/auth/register.ts';
import { validateInputFields } from '../../../ui/auth/inputValidation.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { appendAlertAndRedirect } from '../../errorHandling/newAlert/appendAlertAndRedirect.ts';

export function createRegisterUserForm(): HTMLDivElement {
  const outerContainer: HTMLDivElement = document.createElement('div');
  outerContainer.className = 'container my-5';

  const row: HTMLDivElement = document.createElement('div');
  row.className = 'mx-2 row';

  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.className = 'col-md-6 col-lg-4 mx-auto shadow-lg p-4';

  const title: HTMLHeadingElement = document.createElement('h2');
  title.textContent = 'Join Bidly!';
  title.className = 'mb-3 text-primary text-center';

  const info: HTMLParagraphElement = document.createElement('p');
  info.className = 'mb-3 text-center p-2';
  info.textContent =
    'Create an account to start bidding on our exclusive products or start selling you own luxury items! ';

  formContainer.append(title);
  formContainer.append(info);

  const form: HTMLFormElement = document.createElement('form');
  form.id = 'register-user-form';

  const nameGroup: HTMLDivElement = document.createElement('div');
  nameGroup.className = 'mb-3';
  nameGroup.appendChild(createLabel('Name', 'name'));
  nameGroup.appendChild(
    createUserInput('Enter your name', 'text', 'name', 'name'),
  );

  const emailGroup: HTMLDivElement = document.createElement('div');
  emailGroup.className = 'mb-3';
  emailGroup.appendChild(createLabel('Email', 'email'));
  emailGroup.appendChild(
    createUserInput('Enter your email', 'email', 'email', 'email'),
  );

  const emailError: HTMLDivElement = document.createElement('div');
  emailError.id = 'emailError';
  emailError.className = 'text-danger invalid-feedback';
  emailError.innerHTML = 'Email must end with @stud.noroff.no';
  emailGroup.appendChild(emailError);

  const passwordGroup: HTMLDivElement = document.createElement('div');
  passwordGroup.className = 'mb-3';
  passwordGroup.appendChild(createLabel('Password', 'password'));
  passwordGroup.appendChild(
    createUserInput('Enter your password', 'password', 'password', 'password'),
  );

  const passwordError: HTMLDivElement = document.createElement('div');
  passwordError.id = 'passwordError';
  passwordError.className = 'text-danger invalid-feedback';
  passwordError.innerHTML = 'Password must be at least 8 characters';
  passwordGroup.appendChild(passwordError);

  const button: HTMLDivElement = document.createElement('div');
  button.appendChild(createSubmitButton('Register'));
  button.className = 'd-grid mt-3';

  form.appendChild(nameGroup);
  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(button);

  form.addEventListener('submit', onRegisterFormSubmit);

  formContainer.appendChild(form);
  row.appendChild(formContainer);
  outerContainer.appendChild(row);

  return outerContainer;
}

async function onRegisterFormSubmit(event: Event): Promise<void> {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const name: FormDataEntryValue | null = formData.get('name');
  const email: FormDataEntryValue | null = formData.get('email');
  const password: FormDataEntryValue | null = formData.get('password');

  if (!name || !email || !password) {
    throw new Error('Please enter a name, email and password');
  }

  validateInputFields();

  const credentials = {
    name: name.toString(),
    email: email.toString(),
    password: password.toString(),
  };

  const result = await register(credentials);

  if (result.success) {
    await appendAlertAndRedirect(
      'Registration successful',
      'success',
      '/login',
    );
  } else {
    appendAlert('Could not register an account, try again.', 'danger');
  }
}
