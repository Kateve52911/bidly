import { loadCurrentUser } from '../../utils/storage/storage.ts';
import { fetchUser } from '../../api/user/fetchUser.ts';
import { Profile } from '../../api/user/types/profile.ts';

export async function renderCurrentUserToNavBar(): Promise<void> {
  const currentUser: Profile | null = loadCurrentUser();
  if (currentUser) {
    const user = await fetchUser(currentUser.name);

    const userInfo: HTMLDivElement = document.createElement('div');
    userInfo.className =
      'me-3 d-flex align-items-center gap-2 flex-md-row align-items-center';

    const userName: HTMLLIElement = document.createElement('li');
    userName.innerHTML = `<span class="nav-link text-primary">${user.name}</span>`;
    userName.className = 'me-3';

    const userCredit: HTMLLIElement = document.createElement('li');
    userCredit.className = ' me-3';
    userCredit.innerHTML = `<span class="nav-link text-primary">Credits: ${user.credits}</span>`;

    userInfo.appendChild(userName);
    userInfo.appendChild(userCredit);

    const navbarLinks: HTMLElement | null =
      document.getElementById('navbar-links');

    if (navbarLinks) {
      const firstLink: Element | null = navbarLinks.firstElementChild;
      if (firstLink) {
        navbarLinks.insertBefore(userName, firstLink);
        navbarLinks.insertBefore(userCredit, firstLink);
      }
    }
  }
}
