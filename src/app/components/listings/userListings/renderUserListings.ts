import { fetchUserListings } from '../../../api/listings/fetch/fetchUserListings.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { createListingCard } from '../card/createListingCard.ts';

export async function renderUserListings(
  username: string,
  listingsContainer: HTMLElement,
): Promise<HTMLElement | null> {
  const userListings: Array<Listing> = await fetchUserListings(username);
  console.log(listingsContainer);
  if (!listingsContainer) {
    console.error('No user listing container found');
    return listingsContainer;
  } else {
    const numListings: number = userListings.length;
    const numRows: number = Math.ceil(numListings / 3);
    let itemCount: number = 0;
    for (let i: number = 0; i < numRows; i++) {
      const row: HTMLDivElement = createListingRow();
      for (let j: number = 0; j < 3; j++) {
        // && itemCount < numListings
        console.log(`${i}-${j}`);
        console.log(userListings[itemCount]);
        const child: HTMLDivElement = createListingCard(
          userListings[itemCount],
        );
        row.appendChild(child);
        itemCount++;
      }
      listingsContainer.appendChild(row);
    }
  }
  return listingsContainer;
}
