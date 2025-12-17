import { createLoginForm } from '../components/forms/login/loginForm.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { fetchAllListings } from '../api/listings/fetch/fetchAllListings.ts';

const form: HTMLDivElement = createLoginForm();
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(form);
} else {
  console.error('App element nor found');
}

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

fetchAllListings();
