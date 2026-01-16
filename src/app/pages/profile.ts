import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderProfilePage } from '../components/profile/renderProfilePage.ts';
//import { fetchUserListings } from '../api/listings/fetch/fetchSingleUsersListings.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

renderProfilePage();
