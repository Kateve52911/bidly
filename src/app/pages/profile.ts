import { initNavbar } from '../components/navbar/initNavBar.ts';
import { renderProfilePage } from '../components/profile/renderProfilePage.ts';

export function initPage(): void {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);

renderProfilePage();
