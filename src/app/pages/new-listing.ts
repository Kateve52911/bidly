import { initNavbar } from '../components/navbar/initNavBar.ts';
import { createNewListingForm } from '../components/forms/newListing/newListingForm.ts';
import { submitListing } from '../api/listings/post/sumbitNewListing.ts';
import { fetchFormDataFromNewListingForm } from '../components/listings/newListing/newListingFormData.ts';
import { isValidDate } from '../utils/validation/listingValidation.ts';

const formContainer = createNewListingForm();
const app: HTMLElement | null = document.getElementById('app');

if (app) {
  app.appendChild(formContainer);
  const form = document.getElementById('new-listing-form');

  form?.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const endingDate = formData.get('endingDate') as string;
    if (!isValidDate(endingDate)) {
      appendAlert('Please enter a valid date', 'warning');
      return;
    }

    try {
      await submitListing(fetchFormDataFromNewListingForm(formData));
      //window.location.href = '/index';
      console.log('Successfully created');
    } catch (error) {
      console.error(error);
    }
  });
} else {
  console.error('App element nor found');
}

export async function initPage() {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    await initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);
