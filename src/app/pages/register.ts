import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createRegisterUserForm } from '../components/forms/registerUser/registerUserForm.ts';
import { validateInputFields } from '../ui/auth/inputValidation.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';

export function initPage(): void {
  const navbar: HTMLElement | null = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }

  document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    initializeNavbar();
    initPage();
  });

  const form: HTMLDivElement = createRegisterUserForm();

  const app: HTMLElement | null = document.getElementById('app');

  if (app) {
    app.appendChild(form);
    validateInputFields();
  } else {
    appendAlert('App element not found', 'danger');
  }
}

document.addEventListener('DOMContentLoaded', initPage);
