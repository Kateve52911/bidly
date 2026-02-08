import { createLoginForm } from '../components/forms/login/loginForm.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';

const form: HTMLDivElement = createLoginForm();
const app: HTMLElement | null = document.getElementById('app-login');

if (app) {
  app.appendChild(form);
} else {
  appendAlert('App element nor found', 'danger');
}

export function initPage(): void {
  const navbar: HTMLElement | null = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  initializeNavbar();
  initPage();
});
