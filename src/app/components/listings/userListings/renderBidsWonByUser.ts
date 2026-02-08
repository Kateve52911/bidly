import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { fetchBidsWonByUser } from '../../../api/listings/fetch/fetchBidsWonByUser.ts';
import { createBidsWonByUserCard } from '../card/createBidsWonCard.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';

export async function renderBidsWonByUser(
  username: string,
  listingsContainer: HTMLElement,
): Promise<HTMLElement | null> {
  const bidsWon: Array<Listing> = await fetchBidsWonByUser(username);
  if (!listingsContainer) {
    appendAlert('No user listing container found', 'danger');
    return listingsContainer;
  } else {
    let currentRow: HTMLDivElement | null = null;

    bidsWon.forEach((win: Listing, index: number): void => {
      if (index % 3 === 0) {
        currentRow = createListingRow();
        currentRow.classList.remove('justify-content-center');
        currentRow.classList.add('justify-content-start');
        listingsContainer.appendChild(currentRow);
      }
      const child: HTMLDivElement = createBidsWonByUserCard(win);
      currentRow?.appendChild(child);
    });
  }
  return listingsContainer;
}
