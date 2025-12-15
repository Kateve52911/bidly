import { createLabel } from '../../../utils/helpers/forms/createLabel.ts';
import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';
import { login } from '../../../api/auth/login.ts';

export function createLoginForm(): HTMLDivElement {
  const outerContainer: HTMLDivElement = document.createElement('div');
  outerContainer.className = 'container my-5';

  const row: HTMLDivElement = document.createElement('div');
  row.className = 'row';

  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.className = 'col-md-6 col-lg-4 mx-auto shadow-lg p-4';

  const title: HTMLHeadingElement = document.createElement('h2');
  title.textContent = 'Welcome Back!';
  title.className = 'mb-3 text-primary text-center';

  const info: HTMLParagraphElement = document.createElement('p');
  info.className = 'mb-3 text-center p-2';
  info.textContent = 'Sign in to access your bids and place a new one! ';

  formContainer.append(title);
  formContainer.append(info);

  const form: HTMLFormElement = document.createElement('form');
  form.id = 'login-form';

  const emailGroup: HTMLDivElement = document.createElement('div');
  emailGroup.className = 'mb-3';
  emailGroup.appendChild(createLabel('Email', 'email'));
  emailGroup.appendChild(createUserInput('Enter your email', 'email', 'email'));

  const passwordGroup: HTMLDivElement = document.createElement('div');
  passwordGroup.className = 'mb-3';
  passwordGroup.appendChild(createLabel('Password', 'password'));
  passwordGroup.appendChild(
    createUserInput('Enter your password', 'password', 'password'),
  );

  const button: HTMLDivElement = document.createElement('div');
  button.appendChild(createSubmitButton('Login'));
  button.className = 'd-grid mt-3';

  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(button);

  form.addEventListener('submit', onLoginFormSubmit);

  formContainer.appendChild(form);
  row.appendChild(formContainer);
  outerContainer.appendChild(row);

  return outerContainer;
}

async function onLoginFormSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const formFields = Object.fromEntries(formData);

  console.log('Form fields:', formFields);

  const result = await login(formFields);
  if (result.success) {
    console.log('Login successful!', result);
    //window.location.href="/profile";
  } else {
    console.error('Registration failed', result.error);
  }
}
