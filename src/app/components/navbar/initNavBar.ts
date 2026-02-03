import { renderNavBarButton } from './renderNavBarButton.ts';
import { renderCurrentUserToNavBar } from './renderCurrentUserToNavBar.ts';
import { isAuthenticated } from '../../utils/auth/auth.ts';

export async function initNavbar() {
  const listingsLink = document.querySelector('a[href="index.html"]');
  if (isAuthenticated()) {
    console.log('User is authenticated, adding Profile link');
    const navbarLinks: HTMLElement | null =
      document.getElementById('navbar-links');

    const dashboardLi = document.createElement('li');
    dashboardLi.className = 'nav-item me-2';

    const dashboardHref = document.createElement('a');
    dashboardHref.href = 'profile.html';
    dashboardHref.className = 'nav-link';
    dashboardHref.textContent = 'Profile';

    dashboardLi.appendChild(dashboardHref);

    if (navbarLinks) {
      navbarLinks.appendChild(dashboardLi);
    }

    if (window.location.pathname.includes('profile.html')) {
      dashboardHref.classList.add('active');
      listingsLink?.classList.remove('active');
    } else {
      listingsLink?.classList.add('active');
    }
  } else {
    listingsLink?.classList.add('active');
  }

  renderNavBarButton();
  await renderCurrentUserToNavBar();
}
