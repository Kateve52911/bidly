import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderSingleListing } from '../components/listings/renderSingleListing.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

const queryParams = new URLSearchParams(window.location.search);
export const listingId: string | null = queryParams.get('id');
console.log(listingId);

const listing: HTMLElement = await renderSingleListing(listingId);
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(listing);
} else {
  console.error('App element nor found');
}
