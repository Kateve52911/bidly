import { renderNavBarButton } from './renderNavBarButton.ts';
import { renderCurrentUserToNavBar } from './renderCurrentUserToNavBar.ts';

export function initNavbar() {
  renderNavBarButton();
  renderCurrentUserToNavBar();
}
