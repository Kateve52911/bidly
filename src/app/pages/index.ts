import { fetchListings } from '../api/listings/fetch/fetchListings.ts';
import { Listing } from '../utils/helpers/card/type/listing.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderSearchBar } from '../components/listings/searchBar/renderSearchBar.ts';
import { createInfiniteScrollButton } from '../components/listings/infiniteScroll/createInfiniteScrollButton.ts';
import { displayListingsPage } from '../components/listings/allListings/renderAllListings.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';

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

let pageNumber: number = 1;

export async function displayListings(): Promise<HTMLElement | null> {
  const listings: Array<Listing> = await fetchListings(21, pageNumber);
  const listingContainer: HTMLElement | null =
    document.getElementById('listings-Container');

  if (!listingContainer) {
    appendAlert('Could not find listing container', 'danger');
  } else {
    if (!listingContainer.querySelector('h1')) {
      const heading: HTMLHeadingElement = document.createElement('h1');
      heading.textContent = 'Listings';
      heading.className = 'text-primary display-2 p-2 m-3';
      listingContainer.appendChild(heading);

      const searchBar: HTMLDivElement = renderSearchBar(listings);
      listingContainer.appendChild(searchBar);
    }

    let rowContainer: HTMLDivElement | null =
      listingContainer.querySelector('.row-container');
    if (!rowContainer) {
      rowContainer = document.createElement('div');
      rowContainer.className = 'row-container';
      listingContainer.appendChild(rowContainer);
    }

    displayListingsPage(listings, rowContainer);

    let infiniteScrollButton: HTMLButtonElement | null =
      document.getElementById('load-more-button') as HTMLButtonElement | null;
    if (!infiniteScrollButton) {
      infiniteScrollButton = createInfiniteScrollButton();

      infiniteScrollButton.addEventListener('click', async () => {
        pageNumber++;
        const moreListings = await fetchListings(21, pageNumber);
        if (moreListings.length > 0) {
          displayListingsPage(moreListings, rowContainer!);
        }

        if (moreListings.length < 21) {
          appendAlert('No more listings found.', 'warning');
          infiniteScrollButton!.classList.add('d-none');
        }
      });
    }
    if (infiniteScrollButton) {
      listingContainer.appendChild(infiniteScrollButton);
    }
  }

  return listingContainer;
}

(async (): Promise<void> => {
  await displayListings();
})();
