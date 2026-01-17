import { initNavbar } from '../components/navbar/initNavBar.ts';

export function initPage() {
  const navbar = document.getElementById('navbar-links');
  if (navbar) {
    initNavbar();
  }
}
document.addEventListener('DOMContentLoaded', initPage);
