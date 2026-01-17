import { renderNavBarButton } from './renderNavBarButton.ts';
import { renderCurrentUserToNavBar } from './renderCurrentUserToNavBar.ts';

export async function initNavbar() {
  renderNavBarButton();
  await renderCurrentUserToNavBar();
}
