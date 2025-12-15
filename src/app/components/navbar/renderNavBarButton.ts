import { isAuthenticated } from '../../utils/auth/auth.ts';

export function renderNavBarButton() {
  const navbarList: HTMLElement | null =
    document.getElementById('navbar-links');

  if (isAuthenticated()) {
    const li: HTMLLIElement = document.createElement('li');
    li.className = 'nav-item me-2';

    const logoutButton: HTMLButtonElement = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.className = 'btn btn-success';

    li.appendChild(logoutButton);
    navbarList?.appendChild(li);
  } else {
    const li: HTMLLIElement = document.createElement('li');
    li.className = 'nav-item me-2';

    const loginIcon: HTMLElement = document.createElement('i');
    loginIcon.className = 'bi bi-box-arrow-in-right me-2';

    const loginButton: HTMLButtonElement = document.createElement('button');
    loginButton.className = 'btn btn-outline-primary';

    loginButton.appendChild(loginIcon); // Icon first
    loginButton.append(' Login');

    li.appendChild(loginButton);
    navbarList?.appendChild(li);
  }
}
