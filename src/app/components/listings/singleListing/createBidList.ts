import { Bid, Listing } from '../../../utils/helpers/card/type/listing.ts';

export function createBidsList(listingData: Listing): HTMLDivElement {
  const allBidsContainer: HTMLDivElement = document.createElement('div');
  allBidsContainer.id = 'all-bids';
  allBidsContainer.className = ' m-2 py-3 px-4';

  const highestBidText: HTMLParagraphElement = document.createElement('p');
  highestBidText.id = 'highest-bid-container';
  highestBidText.className = 'bg-primary bg-opacity-10 m-2 py-3 px-4 text-left';
  highestBidText.innerHTML = 'CURRENT BID';

  const highestBidDiv: HTMLDivElement = document.createElement('div');
  highestBidDiv.id = 'highest-bid';
  const bids = listingData.bids;

  if (bids.length > 0) {
    const highestBid: HTMLHeadingElement = document.createElement('h4');
    highestBid.innerHTML = `${listingData.bids[bids.length - 1].amount}`;
    highestBid.id = 'highest-bid-number';
    highestBid.className = 'text-left text-';
    highestBidDiv.appendChild(highestBid);
  } else {
    highestBidDiv.innerHTML = 'No bids found';
  }

  highestBidText.append(highestBidDiv);
  allBidsContainer.append(highestBidText);

  addAllBidsToContainer(listingData, allBidsContainer);

  return allBidsContainer;
}

function addAllBidsToContainer(
  listingData: Listing,
  allBidsContainer: HTMLDivElement,
): void {
  const bidsReversed: Bid[] = listingData.bids.slice().reverse();
  bidsReversed.forEach((bid: Bid): void => {
    const bidContainer: HTMLDivElement = document.createElement('div');
    bidContainer.id = 'bid-container';
    bidContainer.className =
      'd-flex justify-content-evenly align-items-center m-2 gap-4';
    const avatar: HTMLImageElement = document.createElement('img');
    avatar.id = 'avatar';
    avatar.className = 'avatar rounded-circle avatar-Icon';
    avatar.src = bid.bidder.avatar.url;

    const bidder: HTMLParagraphElement = document.createElement('p');
    bidder.id = 'bidder';
    bidder.className = 'bidder align-self-center';
    bidder.innerHTML = bid.bidder.name;

    const amount: HTMLParagraphElement = document.createElement('p');
    amount.id = 'bid';
    amount.className = 'bid';
    amount.innerHTML = String(bid.amount);

    bidContainer.append(avatar, bidder, amount);
    allBidsContainer.append(bidContainer);
  });
}
