import { delay } from '../../../utils/helpers/delay/delay.ts';

/**
 * Displays a Bootstrap alert message and redirects to a specified URL after a delay.
 *
 * Creates a dismissible Bootstrap alert with the provided message and type,
 * appends it to the alert placeholder container, waits for 1 second to allow
 * the user to see the message, then redirects the browser to the specified URL.
 *
 * @async
 * @param {string} message - The message text to display in the alert
 * @param {string} type - The Bootstrap alert type (e.g., 'success', 'danger', 'warning', 'info')
 * @param {string} url - The URL to redirect to after displaying the alert
 * @returns {Promise<void>} A promise that resolves after the redirect is triggered
 *
 * @requires An HTML element with id 'alert-placeholder-container' must exist in the DOM
 * @requires Bootstrap CSS for alert styling
 *
 * @example
 * // Show success message and redirect to profile page
 * await appendAlertAndRedirect('Login successful!', 'success', '/profile.html');
 *
 * @example
 * // Show error message and redirect to home page
 * await appendAlertAndRedirect('Session expired', 'danger', '/index.html');
 */

export const appendAlertAndRedirect = async (
  message: string,
  type: string,
  url: string,
): Promise<void> => {
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
  await delay(1000);
  window.location.href = url;
};
