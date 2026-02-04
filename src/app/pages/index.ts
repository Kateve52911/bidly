import { fetchListings } from '../api/listings/fetch/fetchListings.ts';
import { Listing } from '../utils/helpers/card/type/listing.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderSearchBar } from '../components/listings/searchBar/renderSearchBar.ts';
import { createInfiniteScrollButton } from '../components/listings/infiniteScroll/createInfiniteScrollButton.ts';
import { displayListingsPage } from '../components/listings/allListings/renderAllListings.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  initPage();
  initializeNavbar();
});

let pageNumber: number = 1;

export async function displayListings(): Promise<HTMLElement | null> {
  const listings: Array<Listing> = await fetchListings(21, pageNumber);
  const listingContainer: HTMLElement | null =
    document.getElementById('listings-Container');

  if (!listingContainer) {
    console.error('Could not find listing container'); // TODO: Throw error
  } else {
    const heading = document.createElement('h1');
    heading.textContent = 'Listings';
    heading.className = 'text-primary display-2 p-2 m-3';
    listingContainer.appendChild(heading);

    const searchBar = renderSearchBar(listings);
    listingContainer.appendChild(searchBar);

    const rowContainer: HTMLDivElement = document.createElement('div');
    rowContainer.className = 'row-container';
    listingContainer.appendChild(rowContainer);

    displayListingsPage(listings, rowContainer);
    const infiniteScrollButton = createInfiniteScrollButton();
    listingContainer.appendChild(infiniteScrollButton);

    infiniteScrollButton.addEventListener('click', async () => {
      pageNumber++;
      const moreListings = await fetchListings(21, pageNumber);
      if (moreListings.length > 0) {
        displayListingsPage(moreListings, rowContainer);
      }

      if (moreListings.length < 21) {
        appendAlert('No more listings found.', 'warning');
        infiniteScrollButton.classList.add('d-none');
      }
    });
  }

  return listingContainer;
}

(async () => {
  await displayListings();
})();
