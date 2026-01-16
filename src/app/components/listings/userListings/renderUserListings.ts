import { fetchUserListings } from '../../../api/listings/fetch/fetchUserListings.ts';
import { Data } from '../../../utils/helpers/card/type/card.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { createListingCard } from '../card/createListingCard.ts';

export async function renderUserListings(
  username: string,
): Promise<HTMLElement | null> {
  try {
    const userListings: Array<Data> = await fetchUserListings(username);
    const listingsContainer: HTMLElement | null =
      document.getElementById('user-posts');
    if (!listingsContainer) {
      console.error('No user listing container found');
    } else {
      const numListings: number = userListings.length;
      const numRows: number = Math.ceil(numListings / 3);
      let itemCount: number = 0;
      for (let i: number = 0; i < numRows; i++) {
        const row: HTMLDivElement = createListingRow();
        for (let j: number = 0; j < 3; j++) {
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
  } catch (error) {
    console.log(error);
  }
}
