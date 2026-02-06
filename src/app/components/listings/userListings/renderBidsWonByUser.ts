import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { fetchBidsWonByUser } from '../../../api/listings/fetch/fetchBidsWonByUser.ts';
import { createBidsWonByUserCard } from '../card/createBidsWonCard.ts';

export async function renderBidsWonByUser(
  username: string,
  listingsContainer: HTMLElement,
): Promise<HTMLElement | null> {
  const bidsWon: Array<Listing> = await fetchBidsWonByUser(username);
  if (!listingsContainer) {
    console.error('No user listing container found');
    return listingsContainer;
  } else {
    let currentRow: HTMLDivElement | null = null;

    bidsWon.forEach((win, index) => {
      if (index % 3 === 0) {
        currentRow = createListingRow();
        listingsContainer.appendChild(currentRow);
      }
      const child = createBidsWonByUserCard(win);
      currentRow?.appendChild(child);
    });
  }
  return listingsContainer;
}
