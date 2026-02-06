import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { displayListingStatus } from '../../../utils/helpers/listings/listingStatus.ts';

export function createBidsWonByUserCard(listing: Listing): HTMLDivElement {
  const { column, container, card } = createBaseListingCard(listing);

  const listingStatus: { status: string; className: string } =
    displayListingStatus(listing.endsAt);

  const listingStatusSpan: HTMLSpanElement = document.createElement('span');
  listingStatusSpan.className = 'rounded  px-1 me-auto my-1 small-text';
  listingStatusSpan.id = 'status-badge';
  listingStatusSpan.classList.add(listingStatus.className);
  listingStatusSpan.innerHTML = listingStatus.status;

  card.prepend(listingStatusSpan);

  const seller: HTMLDivElement = document.createElement('div');
  seller.id = 'seller';
  seller.className = 'text-left text-dark p-1 small-text';
  seller.innerHTML = `<strong>Sold by</strong> ${listing.seller.name}`;

  card.append(seller);

  container.addEventListener('click', () => {
    window.location.href = `listing.html?id=${listing.id}`;
  });

  return column;
}
