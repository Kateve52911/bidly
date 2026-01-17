import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createNewListingForm } from '../components/forms/newListing/newListingForm.ts';

const form = createNewListingForm();
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(form);
} else {
  console.error('App element nor found');
}

export async function initPage() {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    await initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);
