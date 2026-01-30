import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderProfilePage } from '../components/profile/renderProfilePage.ts';
//import { createEditListingCard } from '../components/forms/editListing/createEditListingForm.ts';
//import { fetchUserListings } from '../api/listings/fetch/fetchUserListings.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

renderProfilePage();
