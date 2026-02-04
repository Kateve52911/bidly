import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createRegisterUserForm } from '../components/forms/registerUser/registerUserForm.ts';
import { validateInputFields } from '../ui/auth/inputValidation.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    initializeNavbar();
    initPage();
  });

  const form: HTMLDivElement = createRegisterUserForm();

  const app: HTMLElement | null = document.getElementById('app');

  if (app) {
    app.appendChild(form);
    validateInputFields();
  } else {
    console.error('App element not found');
  }
}

document.addEventListener('DOMContentLoaded', initPage);
