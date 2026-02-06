import { createUserInput } from '../../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../../utils/helpers/forms/createButton.ts';

export function createBidForm(
  onSubmit: (event: Event) => void,
): HTMLFormElement {
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
  placeBidForm.addEventListener('submit', onSubmit);

  return placeBidForm;
}
