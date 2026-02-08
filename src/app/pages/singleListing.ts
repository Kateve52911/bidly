import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderSingleListing } from '../components/listings/singleListing/renderSingleListing.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';

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

const queryParams = new URLSearchParams(window.location.search);
export const listingId: string | null = queryParams.get('id');

const listing: HTMLElement = await renderSingleListing(listingId);
const app: HTMLElement | null = document.getElementById('app-listing');

if (app) {
  app.appendChild(listing);

  const listingTitle: string =
    listing.querySelector('h1')?.textContent || 'Auction Listing';
  document.title = `${listingTitle} - Auction | Bidly`;

  const metaDescription: Element | null = document.querySelector(
    'meta[name="description"]',
  );
  if (metaDescription) {
    const description: string =
      listing.querySelector('.description')?.textContent ||
      'View auction details and place your bid';
    metaDescription.setAttribute(
      'content',
      `Bid on ${listingTitle}. ${description.slice(0, 120)}...`,
    );
  }
} else {
  appendAlert('App element not found', 'danger');
}
