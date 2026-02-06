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

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  initializeNavbar();
  initPage();
});

export async function renderProfilePage() {
  const user = loadCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }
  if (user) {
    const username = user.name;
    const userData = await fetchUser(username);

    await fetchUserListings(username);

    console.log(await fetchBidsWonByUser(username));

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(await createUserProfile(userData));

      const profileContainer = document.getElementById('user-content');
      if (profileContainer) {
        const bidsWonByUser = await fetchBidsWonByUser(username);
        console.log(bidsWonByUser);
        const bidsWonTitle = document.createElement('h2');
        bidsWonTitle.innerHTML = `${username}'s Wins`;
        bidsWonTitle.className = 'h4 mb-3';
        profileContainer.appendChild(bidsWonTitle);
        await renderBidsWonByUser(username, profileContainer);

        const bidHistory = await fetchUserBidHistory(username);
        const userBidsTitle: HTMLHeadingElement = document.createElement('h2');
        userBidsTitle.className = 'h4 mb-3';
        userBidsTitle.textContent = `${bidHistory[0].bidder.name}'s Bids`;
        profileContainer.appendChild(userBidsTitle);
        profileContainer.appendChild(createBidHistoryTable(bidHistory));
      }
    }
  }
}

await renderProfilePage();

/*document.addEventListener('DOMContentLoaded', () => {
  if (navbar) {
    initNavbar();
  }
})*/
