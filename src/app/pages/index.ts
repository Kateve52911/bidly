import { fetchAllListings } from '../api/listings/fetch/fetchAllListings.ts';
import { createListingCard } from '../components/listings/card/createListingCard.ts';
import { Data } from '../utils/helpers/card/type/card.ts';
import { initNavbar } from '../components/navbar/initNavBar.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

function createListingRow(): HTMLDivElement {
  const row: HTMLDivElement = document.createElement('div');
  row.classList = 'row justify-content-center ms-5';
  return row;
}

async function renderAllListings(): Promise<HTMLElement | null> {
  const allListings: Array<Data> = await fetchAllListings();
  const listingContainer: HTMLElement | null =
    document.getElementById('listings-Container');
  if (!listingContainer) {
    console.error('Could not find listing container'); // TODO: Throw error
  } else {
    const numListings: number = allListings.length;
    const numRows: number = Math.ceil(numListings / 3);
    let itemCount: number = 0;
    for (let i: number = 0; i < numRows; i++) {
      const row: HTMLDivElement = createListingRow();
      for (let j: number = 0; j < 3; j++) {
        const child: HTMLDivElement = createListingCard(allListings[itemCount]);
        row.appendChild(child);
        itemCount++;
      }
      listingContainer.appendChild(row);
    }
  }
  return listingContainer;
}

await renderAllListings();
