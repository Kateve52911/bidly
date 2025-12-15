import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createRegisterUserForm } from '../components/forms/registerUser/registerUserForm.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}

document.addEventListener('DOMContentLoaded', initPage);

console.log('Hello World!');

const form: HTMLDivElement = createRegisterUserForm();
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(form);
} else {
  console.error('App element not found');
}
