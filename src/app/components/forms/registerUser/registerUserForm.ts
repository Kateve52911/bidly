/*
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
*/

import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { register } from '../../../api/auth/register.ts';
import {
  isValidEmail,
  isValidPassword,
} from '../../../ui/auth/inputValidation.ts';
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
  const emailInput: HTMLInputElement = createUserInput(
    'Enter your email',
    'email',
    'email',
    'email',
  );
  emailGroup.appendChild(emailInput);

  const emailError: HTMLDivElement = document.createElement('div');
  emailError.id = 'emailError';
  emailError.className = 'invalid-feedback';
  emailError.innerHTML = 'Email must end with @stud.noroff.no';
  emailGroup.appendChild(emailError);

  const passwordGroup: HTMLDivElement = document.createElement('div');
  passwordGroup.className = 'mb-3';
  passwordGroup.appendChild(createLabel('Password', 'password'));
  const passwordInput: HTMLInputElement = createUserInput(
    'Enter your password',
    'password',
    'password',
    'password',
  );
  passwordGroup.appendChild(passwordInput);

  const passwordError: HTMLDivElement = document.createElement('div');
  passwordError.id = 'passwordError';
  passwordError.className = 'invalid-feedback';
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

  setupRealTimeValidation(
    emailInput as HTMLInputElement,
    passwordInput as HTMLInputElement,
    emailError,
    passwordError,
  );

  formContainer.appendChild(form);
  row.appendChild(formContainer);
  outerContainer.appendChild(row);

  return outerContainer;
}

function setupRealTimeValidation(
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  emailError: HTMLDivElement,
  passwordError: HTMLDivElement,
): void {
  emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value;

    if (emailValue.length === 0) {
      emailInput.classList.remove('is-invalid', 'is-valid');
      emailError.style.display = 'none';
    } else if (!isValidEmail(emailValue)) {
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
      emailError.style.display = 'block';
    } else {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      emailError.style.display = 'none';
    }
  });

  passwordInput.addEventListener('input', () => {
    const passwordValue: string = passwordInput.value;

    if (passwordValue.length === 0) {
      passwordInput.classList.remove('is-invalid', 'is-valid');
      passwordError.style.display = 'none';
    } else if (!isValidPassword(passwordValue)) {
      passwordInput.classList.add('is-invalid');
      passwordInput.classList.remove('is-valid');
      passwordError.style.display = 'block';
    } else {
      passwordInput.classList.remove('is-invalid');
      passwordInput.classList.add('is-valid');
      passwordError.style.display = 'none';
    }
  });
}

/**
 * Handles the registration form submission event.
 *
 * Prevents default form submission, extracts and validates name, email, and password
 * from the form data. Validates that the email is a valid @stud.noroff.no address
 * and that the password meets minimum length requirements. On successful registration,
 * displays a success alert and redirects to the login page. On validation or registration
 * failure, displays appropriate error alerts.
 *
 * @async
 * @param {Event} event - The form submission event
 * @returns {Promise<void>} A promise that resolves when the registration process completes
 *
 * @requires isValidEmail - Function to validate email format
 * @requires isValidPassword - Function to validate password requirements
 * @requires register - Function to handle API registration request
 * @requires appendAlert - Function to display alert messages
 * @requires appendAlertAndRedirect - Function to display alert and redirect
 *
 * @example
 * const registerForm = document.getElementById('register-form');
 * registerForm.addEventListener('submit', onRegisterFormSubmit);
 *
 * @throws Catches and handles registration errors by displaying error alerts
 */

async function onRegisterFormSubmit(event: Event): Promise<void> {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const name: FormDataEntryValue | null = formData.get('name');
  const email: FormDataEntryValue | null = formData.get('email');
  const password: FormDataEntryValue | null = formData.get('password');

  if (!name || !email || !password) {
    appendAlert('Please enter a name, email and password', 'danger');
    return;
  }

  const emailValue: string = email.toString();
  const passwordValue: string = password.toString();

  if (!isValidEmail(emailValue)) {
    appendAlert('Please enter a valid @stud.noroff.no email address', 'danger');
    return;
  }

  if (!isValidPassword(passwordValue)) {
    appendAlert('Password must be at least 8 characters', 'danger');
    return;
  }

  const credentials = {
    name: name.toString(),
    email: emailValue,
    password: passwordValue,
  };

  try {
    const result = await register(credentials);

    if (result.success) {
      await appendAlertAndRedirect(
        'Registration successful! Welcome to Bidly!',
        'success',
        '/login',
      );
    } else {
      appendAlert('Could not register an account, please try again.', 'danger');
    }
  } catch (error) {
    appendAlert(
      `An error occurred during registration: ${(error as Error).message}. Please try again.`,
      'danger',
    );
  }
}
