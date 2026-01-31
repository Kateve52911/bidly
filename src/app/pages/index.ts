import { fetchListings } from '../api/listings/fetch/fetchListings.ts';
import { createListingCard } from '../components/listings/card/createListingCard.ts';
import { Listing } from '../utils/helpers/card/type/listing.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createListingRow } from '../utils/helpers/listings/createListingRow.ts';
import { renderSearchBar } from '../components/listings/searchBar/renderSearchBar.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

export async function renderAllListings(): Promise<HTMLElement | null> {
  const allListings: Array<Listing> = await fetchListings();
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

    const numListings: number = allListings.length;
    const numRows: number = Math.ceil(numListings / 3);
    let itemCount: number = 0;
    for (let i: number = 0; i < numRows; i++) {
      const row: HTMLDivElement = createListingRow();
      row.classList.add('listing-row');
      for (let j: number = 0; j < 3 && itemCount < numListings; j++) {
        const child: HTMLDivElement = createListingCard(allListings[itemCount]);
        row.appendChild(child);
        itemCount++;
      }
      listingContainer.appendChild(row);

      //const paginationControls = createPaginationControls(1, 15);
      //listingContainer.appendChild(paginationControls);
    }
  }

  return listingContainer;
}

await renderAllListings();
