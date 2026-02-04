export function initializeNavbar(): void {
  const toggler: HTMLElement | null = document.getElementById('navbarToggler');
  const togglerIcon: HTMLElement | null =
    document.getElementById('togglerIcon');
  const navbarCollapse: HTMLElement | null =
    document.getElementById('navbarLinks');

  if (!toggler || !togglerIcon || !navbarCollapse) return;

  navbarCollapse.addEventListener('show.bs.collapse', (): void => {
    togglerIcon.classList.remove('bi-list');
    togglerIcon.classList.add('bi-x-lg');
  });

  navbarCollapse.addEventListener('hide.bs.collapse', (): void => {
    togglerIcon.classList.remove('bi-x-lg');
    togglerIcon.classList.add('bi-list');
  });
}
