import { fetchListings } from '../api/listings/fetch/fetchListings.ts';
import { Listing } from '../utils/helpers/card/type/listing.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderSearchBar } from '../components/listings/searchBar/renderSearchBar.ts';
import { createInfiniteScrollButton } from '../components/listings/infiniteScroll/createInfiniteScrollButton.ts';
import { displayListingsPage } from '../components/listings/allListings/renderAllListings.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

export async function displayListings(): Promise<HTMLElement | null> {
  const allListings: Array<Listing> = await fetchListings(21, 1);
  const listingContainer: HTMLElement | null =
    document.getElementById('listings-Container');

  if (!listingContainer) {
    console.error('Could not find listing container'); // TODO: Throw error
  } else {
    const heading = document.createElement('h1');
    heading.textContent = 'Listings';
    heading.className = 'text-primary display-2 p-2 m-3';
    listingContainer.appendChild(heading);

    const searchBar = renderSearchBar(allListings);
    listingContainer.appendChild(searchBar);

    const rowContainer: HTMLDivElement = document.createElement('div');
    rowContainer.className = 'row-container';
    listingContainer.appendChild(rowContainer);

    displayListingsPage(allListings, rowContainer);
    const paginationControls = createInfiniteScrollButton();
    listingContainer.appendChild(paginationControls);
  }

  return listingContainer;
}

await displayListings();
