import { submitBid } from '../../../api/listings/post/submitBid.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { fetchUser } from '../../../api/user/fetchUser.ts';
import { loadCurrentUser } from '../../../utils/storage/storage.ts';
import { Profile } from '../../../api/user/types/profile.ts';

export async function handleBidSubmission(
  event: Event,
  listingId: string | null,
): Promise<void> {
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
  }

  if (listingId) {
    await submitBid(listingId, userBid);

    appendAlert('Bid has been registered!', 'success');
    const bidInput = document.getElementById('bid') as HTMLInputElement;
    if (bidInput) {
      bidInput.value = '';
    }

    setTimeout((): void => window.location.reload(), 1000);
  }
}
