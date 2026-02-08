/**
 * Displays a Bootstrap alert message in the alert placeholder container.
 *
 * Creates a dismissible Bootstrap alert with the provided message and type,
 * and appends it to the alert placeholder container in the DOM. Unlike
 * appendAlertAndRedirect, this function does not redirect or auto-dismiss.
 *
 * @param {string} message - The message text to display in the alert
 * @param {string} type - The Bootstrap alert type (e.g., 'success', 'danger', 'warning', 'info')
 * @returns {void}
 *
 * @requires An HTML element with id 'alert-placeholder-container' must exist in the DOM
 * @requires Bootstrap CSS for alert styling
 *
 * @example
 * // Display an error message
 * appendAlert('Login failed. Please check your credentials.', 'danger');
 *
 * @example
 * // Display a warning message
 * appendAlert('Your session will expire in 5 minutes.', 'warning');
 */

export const appendAlert = (message: string, type: string): void => {
  const alertPlaceholder: HTMLElement | null = document.getElementById(
    'alert-placeholder-container',
  );
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertPlaceholder?.append(wrapper);
};
