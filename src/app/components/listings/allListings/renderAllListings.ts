import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { createListingCard } from '../card/createListingCard.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';

export function displayListingsPage(
  listingsData: Array<Listing>,
  rowContainer: HTMLDivElement,
): void {
  const numListings: number = listingsData.length;
  const numRows: number = Math.ceil(numListings / 3);
  let itemCount: number = 0;
  for (let i: number = 0; i < numRows; i++) {
    const row: HTMLDivElement = createListingRow();
    row.classList.add('listing-row');
    for (let j: number = 0; j < 3 && itemCount < numListings; j++) {
      const child: HTMLDivElement = createListingCard(listingsData[itemCount]);
      row.appendChild(child);
      itemCount++;
    }
    rowContainer.appendChild(row);
  }
}
