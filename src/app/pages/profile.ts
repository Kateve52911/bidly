import { initNavbar } from '../components/navbar/initNavBar.ts';
import { loadCurrentUser } from '../utils/storage/storage.ts';
import { fetchUser } from '../api/user/fetchUser.ts';
import { fetchUserListings } from '../api/listings/fetch/fetchUserListings.ts';
import { createUserProfile } from '../components/profile/renderUserProfile.ts';
import { fetchUserBidHistory } from '../api/user/get/fetchUserBidHistory.ts';
import { createBidHistoryTable } from '../components/profile/renderUSersBidHistory.ts';
import { initializeNavbar } from '../components/navbar/hamburgerMenu/initialiseHamburger.ts';
import { fetchBidsWonByUser } from '../api/listings/fetch/fetchBidsWonByUser.ts';
import { renderBidsWonByUser } from '../components/listings/userListings/renderBidsWonByUser.ts';
import { Profile } from '../api/user/types/profile.ts';

export function initPage(): void {
  const navbar: HTMLElement | null = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
  initializeNavbar();
  initPage();
});

export async function renderProfilePage(): Promise<void> {
  const user: Profile | null = loadCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }
  if (user) {
    const username: string = user.name;
    const userData = await fetchUser(username);

    await fetchUserListings(username);

    const app: HTMLElement | null = document.getElementById('app-profile');
    if (app) {
      app.appendChild(await createUserProfile(userData));

      const profileContainer: HTMLElement | null =
        document.getElementById('user-content');
      if (profileContainer) {
        const bidsWonByUser = await fetchBidsWonByUser(username);
        const bidsWonTitle: HTMLHeadingElement = document.createElement('h2');
        bidsWonTitle.innerHTML = `Listings <i>${username}</i> has won:`;
        bidsWonTitle.className = 'h4 mb-3';
        profileContainer.appendChild(bidsWonTitle);
        if (bidsWonByUser.length > 0) {
          await renderBidsWonByUser(username, profileContainer);
        } else {
          const bidsWonContainer: HTMLElement = document.createElement('div');
          bidsWonContainer.className = 'text-left text-dark m-5';
          bidsWonContainer.innerHTML = 'User has not won any bids yet! ';
          profileContainer.appendChild(bidsWonContainer);
        }

        const bidHistory = await fetchUserBidHistory(username);
        const userBidsTitle: HTMLHeadingElement = document.createElement('h2');
        userBidsTitle.className = 'h4 mb-3';
        userBidsTitle.innerHTML = `<i><i>${username}</i>'s</i> bid history`;
        profileContainer.appendChild(userBidsTitle);
        profileContainer.appendChild(createBidHistoryTable(bidHistory));
      }
    }
  }
}

await renderProfilePage();
