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
  emailGroup.appendChild(
    createUserInput('Enter your email', 'email', 'email', 'email-input'),
  );

  const emailError: HTMLDivElement = document.createElement('div');
  emailError.className = 'mb-3';
  emailError.id = 'emailError';
  emailGroup.appendChild(emailError);

  const passwordGroup: HTMLDivElement = document.createElement('div');
  passwordGroup.className = 'mb-3';
  passwordGroup.appendChild(createLabel('Password', 'password'));
  passwordGroup.appendChild(
    createUserInput('Enter your password', 'password', 'password', 'password'),
  );

  const passwordError: HTMLDivElement = document.createElement('div');
  passwordError.className = 'mb-3 text-danger invalid-feedback';
  passwordError.id = 'passwordError';
  passwordError.textContent = 'Password must be at least 8 characters';
  passwordGroup.appendChild(passwordError);

  const button: HTMLDivElement = document.createElement('div');
  button.appendChild(createSubmitButton('Login'));
  button.className = 'd-grid mt-3';

  const lineBreak: HTMLDivElement = document.createElement('hr');
  lineBreak.className = ' border-1 border-top border-black';

  const signupMessage: HTMLDivElement = document.createElement('div');
  signupMessage.className = 'mb-3';

  const SignUpParagraph: HTMLParagraphElement = document.createElement('p');
  SignUpParagraph.className = 'text-center text-black';
  SignUpParagraph.innerText = 'Dont have an account?';
  signupMessage.appendChild(SignUpParagraph);

  const signupLink: HTMLAnchorElement = document.createElement('a');
  signupLink.className = 'd-grid m-0 text-center text-success nav-link fw-bold';
  signupLink.textContent = 'Join BIdly!';
  signupLink.href = '/register.html';
  signupMessage.appendChild(signupLink);

  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(button);
  form.appendChild(lineBreak);
  form.appendChild(signupMessage);

  form.addEventListener('submit', onLoginFormSubmit);

  formContainer.appendChild(form);
  row.appendChild(formContainer);
  outerContainer.appendChild(row);

  return outerContainer;
}

async function onLoginFormSubmit(event: Event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const email: FormDataEntryValue | null = formData.get('email');
  const password: FormDataEntryValue | null = formData.get('password');

  if (!email || !password) {
    throw new Error('Invalid email or password');
  }

  const credentials = {
    email: email.toString(),
    password: password.toString(),
  };

  const result = await login(credentials);
  if (result.success) {
    console.log('Login successful!', result);
    window.location.href = '/profile.html';
  } else {
    console.error('Registration failed', result.error);
  }
}
