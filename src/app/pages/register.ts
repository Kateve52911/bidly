import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createRegisterUserForm } from '../components/forms/registerUser/registerUserForm.ts';
import { validatePassword } from '../ui/auth/passwordValidation.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }

  console.log('Hello World!');

  const form: HTMLDivElement = createRegisterUserForm();

  const app: HTMLElement | null = document.getElementById('app');

  if (app) {
    app.appendChild(form);
    validatePassword();
  } else {
    console.error('App element not found');
  }
}

document.addEventListener('DOMContentLoaded', initPage);
