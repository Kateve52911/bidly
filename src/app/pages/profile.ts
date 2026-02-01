import { initNavbar } from '../components/navbar/initNavBar.ts';
import { loadCurrentUser } from '../utils/storage/storage.ts';
import { fetchUser } from '../api/user/fetchUser.ts';
import { fetchUserListings } from '../api/listings/fetch/fetchUserListings.ts';
import { createUserProfile } from '../components/profile/renderUserProfile.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

export async function renderProfilePage() {
  const user = loadCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }
  if (user) {
    const userName = user.name;
    const userData = await fetchUser(userName);

    await fetchUserListings(userName);

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(await createUserProfile(userData));
    }
  }
}

await renderProfilePage();
