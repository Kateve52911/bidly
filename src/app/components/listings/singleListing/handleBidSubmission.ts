import { submitBid } from '../../../api/listings/post/submitBid.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { fetchUser } from '../../../api/user/fetchUser.ts';
import { loadCurrentUser } from '../../../utils/storage/storage.ts';
import { Profile } from '../../../api/user/types/profile.ts';

/**
 * Handles the bid submission form event for auction listings.
 *
 * Prevents default form submission, validates the bid amount against multiple criteria
 * including format validation, minimum bid requirements, and user credit balance.
 * Retrieves the current user's profile and credit information, compares the submitted
 * bid against the current highest bid, and submits the bid if all validations pass.
 * On success, displays a confirmation alert, clears the form, and reloads the page
 * after a 1-second delay to show updated bid information.
 *
 * @async
 * @param {Event} event - The form submission event
 * @param {string | null} listingId - The unique identifier of the listing being bid on
 * @returns {Promise<void>} A promise that resolves when the bid submission process completes
 *
 * @requires loadCurrentUser - Function to retrieve current user from storage
 * @requires fetchUser - Function to fetch user profile and credits from API
 * @requires submitBid - Function to submit bid to API
 * @requires appendAlert - Function to display alert messages
 * @requires An HTML element with id 'highest-bid-number' containing the current highest bid
 * @requires An HTML input element with id 'bid' for the bid form field
 *
 * @example
 * const bidForm = document.getElementById('bid-form');
 * const listingId = '123abc';
 * bidForm.addEventListener('submit', (event) => handleBidSubmission(event, listingId));
 *
 * @validation
 * - Checks if user is logged in (returns early if not)
 * - Validates bid is a positive number
 * - Ensures bid is higher than current highest bid
 * - Verifies user has sufficient credits to place bid
 */

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
