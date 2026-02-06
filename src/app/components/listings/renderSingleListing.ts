import { fetchSingleListing } from '../../api/listings/fetch/fetchSingleListing.ts';
import { Bid, Listing } from '../../utils/helpers/card/type/listing.ts';
import { createUserInput } from '../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../utils/helpers/forms/createButton.ts';
import { listingId } from '../../pages/singleListing.ts';
import { submitBid } from '../../api/listings/post/submitBid.ts';
import { appendAlert } from '../errorHandling/newAlert/newAlert.ts';
import { isAuthenticated } from '../../utils/auth/auth.ts';
import { fetchUser } from '../../api/user/fetchUser.ts';
import { loadCurrentUser } from '../../utils/storage/storage.ts';
import { Profile } from '../../api/user/types/profile.ts';

function addAllBidsToContainer(
  listingData: Listing,
  allBidsContainer: HTMLDivElement,
) {
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

export async function renderSingleListing(
  listingId: string | null = null,
): Promise<HTMLElement> {
  if (!listingId) {
    appendAlert('No listing id', 'warning');
    return document.createElement('div');
  }
  const listingData: Listing | undefined = await fetchSingleListing(listingId);
  console.log(listingData);

  const container: HTMLDivElement = document.createElement('div');
  container.className =
    'container my-3 d-flex flex-column shadow-lg p-3 rounded w-75';
  container.id = 'listing-container';

  if (!listingData) {
    return container;
  }

  const flexContainer: HTMLDivElement = document.createElement('div');
  flexContainer.id = 'flexContainer';
  flexContainer.className = 'd-flex flex-column flex-lg-row gap-3';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.innerHTML = listingData.title;
  title.className = 'text-left';
  title.id = 'title';

  const infoDiv: HTMLDivElement = document.createElement('div');
  infoDiv.id = 'info-div';
  infoDiv.className =
    'info-div d-flex flex-column justify-content-start flex-grow-1 ps-lg-4';

  const imageContainer: HTMLDivElement = document.createElement('div');
  imageContainer.className = 'flex-shrink-0';
  console.log(typeof listingData.media);
  if (listingData.media.length > 0) {
    listingData.media.forEach((media) => {
      const img: HTMLImageElement = document.createElement('img');
      img.src = media.url;
      img.alt = media.alt;
      img.className = 'img-fluid rounded listing-image';
      imageContainer.append(img);
    });
  }

  const listingTagsDiv: HTMLDivElement = document.createElement('div');
  listingTagsDiv.id = 'listing-tags-div text-success';
  listingTagsDiv.className = 'text-left fst-italic text-success';
  if (listingData.tags.length > 0) {
    listingTagsDiv.innerHTML = listingData.tags.join(', ');
  } else {
    listingTagsDiv.innerHTML = '';
  }

  const listingDescription: HTMLParagraphElement = document.createElement('p');
  listingDescription.id = 'listing-description';
  listingDescription.innerHTML = listingData.description;
  listingDescription.className = 'text-left text-dark my-2 fw-bolder';

  const timeRemainingDiv: HTMLDivElement = document.createElement('div');
  timeRemainingDiv.id = 'time-remaining-div';
  timeRemainingDiv.className = 'text-left text-dark my-2';
  const endsAt = new Date(listingData.endsAt).toLocaleDateString();
  timeRemainingDiv.innerHTML = `Bid ends at: ${endsAt}`;

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

  const alertDiv: HTMLDivElement = document.createElement('div');
  alertDiv.id = 'alert-placeholder-container';
  alertDiv.className = 'mt-3';

  infoDiv.append(
    listingTagsDiv,
    listingDescription,
    timeRemainingDiv,
    allBidsContainer,
    alertDiv,
  );

  if (isAuthenticated()) {
    const placeBidForm: HTMLFormElement = document.createElement('form');
    placeBidForm.id = 'place-bid-form';
    placeBidForm.className =
      ' form d-flex  justify-content-center gap-3 my-3 p-6';

    const inputBidDiv: HTMLDivElement = document.createElement('div');
    inputBidDiv.id = 'input-bid-div';
    inputBidDiv.className = 'p-1';
    inputBidDiv.appendChild(
      createUserInput('Your bid amount', 'number', 'bid', 'bid'),
    );

    const placeBidButton: HTMLDivElement = document.createElement('div');
    placeBidButton.id = 'place-bid-button';
    placeBidButton.className = 'btn-primary p-1';
    placeBidButton.appendChild(createSubmitButton('Place bid'));

    placeBidForm.append(inputBidDiv, placeBidButton);
    placeBidForm.addEventListener('submit', onSubmitBid);
    infoDiv.append(placeBidForm);
  } else {
    const loginDiv: HTMLDivElement = document.createElement('div');
    loginDiv.id = 'login-div';
    loginDiv.innerHTML = 'To place bid, please log in!';
    infoDiv.append(loginDiv);
  }

  flexContainer.append(imageContainer, infoDiv);
  container.append(title, flexContainer);

  return container;
}

async function onSubmitBid(event: Event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const bidString: FormDataEntryValue | null = formData.get('bid');
  const userBid: number = Number(bidString);
  const highestBidElement: HTMLElement | null =
    document.getElementById('highest-bid-number');
  const highestBid: number = Number(highestBidElement?.innerHTML);

  const user: Profile | null = loadCurrentUser();
  if (!user) {
    return;
  }

  const bidder = await fetchUser(user.name);
  const userCredits: number = bidder.credits;

  if (!bidString || isNaN(userBid) || userBid <= 0) {
    appendAlert('Please enter a valid bid amount', 'warning');
    return;
  }

  if (!userBid) {
    appendAlert('Bid not found', 'warning');
    return;
  }

  if (highestBid >= userBid) {
    event.preventDefault();
    appendAlert('Bid needs to be higher than the current bid!', 'danger');
    return;
  } else if (userBid > userCredits) {
    event.preventDefault();
    appendAlert('Insufficient funds!', 'danger');
    return;
  } else {
    appendAlert('Bid has been registered!', 'success');
    const bidInput = document.getElementById('bid') as HTMLInputElement;
    console.log(bidInput);
    bidInput.value = '';
  }
  if (listingId) {
    await submitBid(listingId, userBid);
  }
}
