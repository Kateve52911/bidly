import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';

export function createListingCard(data: Listing) {
  const { column, container, card } = createBaseListingCard(data);

  const listingStatus = document.createElement('span');
  listingStatus.className = 'border rounded py-1 px-2 me-auto my-2 fs-6';
  listingStatus.id = 'status-badge';

  card.prepend(listingStatus);

  const bidsContainer: HTMLDivElement = document.createElement('div');
  bidsContainer.className = 'd-flex justify-content-between p-1';

  const currentBids: HTMLDivElement = document.createElement('div');
  currentBids.className = 'd-flex flex-column';

  const currentBidTitle: HTMLHeadingElement = document.createElement('h6');
  currentBidTitle.innerHTML = 'Current Bid';
  currentBidTitle.className = 'text-left text--dark px-1 small-text';
  currentBids.appendChild(currentBidTitle);

  const highestBidAmount: HTMLParagraphElement = document.createElement('p');
  if (data._count.bids > 0) {
    const numBids: number = data.bids.length;
    highestBidAmount.textContent = `${data.bids[numBids - 1].amount}`;
  } else {
    highestBidAmount.textContent = '0';
  }
  highestBidAmount.className = 'text-center text--dark px-1 small-text';
  currentBids.appendChild(highestBidAmount);

  const numberOfBids: HTMLDivElement = document.createElement('div');
  numberOfBids.className = 'd-flex flex-column';

  const numberOfBidsTitle: HTMLHeadingElement = document.createElement('h6');
  numberOfBidsTitle.innerHTML = 'Bids:';
  numberOfBidsTitle.className = 'text-left text--dark px-1 small-text';
  numberOfBids.appendChild(numberOfBidsTitle);

  const currentNumberBids: HTMLDivElement = document.createElement('div');
  currentNumberBids.textContent = `${data._count.bids}`;
  currentNumberBids.className = 'text-center text--dark px-1 small-text';
  numberOfBids.appendChild(currentNumberBids);

  bidsContainer.appendChild(currentBids);
  bidsContainer.appendChild(numberOfBids);

  card.append(bidsContainer);

  container.addEventListener('click', () => {
    window.location.href = `listing.html?id=${data.id}`;
  });

  return column;
}
