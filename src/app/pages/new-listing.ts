import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createNewListingForm } from '../components/forms/newListing/newListingForm.ts';
import { submitListing } from '../api/listings/post/submitNewListing.ts';
import { fetchFormDataFromNewListingForm } from '../components/listings/newListing/newListingFormData.ts';
import { isValidDate } from '../utils/validation/listingValidation.ts';
import { appendAlert } from '../components/errorHandling/newAlert/newAlert.ts';
import { appendAlertAndRedirect } from '../components/errorHandling/newAlert/appendAlertAndRedirect.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';

const formContainer: HTMLDivElement = createNewListingForm();
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(formContainer);
  const form = document.getElementById('new-listing-form') as HTMLFormElement;

  form?.addEventListener('submit', async (event: Event): Promise<void> => {
    event.preventDefault();

    const submitButton = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
    }
    const formData = new FormData(form);
    const endingDate = formData.get('endingDate') as string;
    if (!isValidDate(endingDate)) {
      appendAlert('Please enter a valid date', 'warning');
      if (submitButton) submitButton.disabled = false;
      return;
    }

    try {
      await submitListing(fetchFormDataFromNewListingForm(formData));
      await appendAlertAndRedirect('Successfully added', 'success', '/index');
    } catch {
      if (submitButton) submitButton.disabled = false;
      appendAlert('Something went wrong. Please try again.', 'danger');
    }
  });
} else {
  appendAlert('An error occurred', 'warning');
}

export async function initPage(): Promise<void> {
  const navbar: HTMLElement | null = document.getElementById('navbar-links');
  if (navbar) {
    await initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  initializeNavbar();
  initPage();
});
