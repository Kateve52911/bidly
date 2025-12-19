import { fetchAllListings } from '../api/listings/fetch/fetchAllListings.ts';
import { createListingCard } from '../utils/helpers/card/createListingCard.ts';
import { Data } from '../utils/helpers/card/type/card.ts';

async function renderAllListings() {
  const allListings = await fetchAllListings();
  const listingContainer = document.getElementById('listings-Container');
  if (!listingContainer) {
    console.error('Could not find listing container'); // TODO: Throw error
  } else {
    allListings.forEach((listing: Data) => {
      const cardContainer = createListingCard(listing);
      listingContainer.appendChild(cardContainer);
    });
  }
}

await renderAllListings();
