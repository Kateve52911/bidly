import { delay } from '../../../utils/helpers/delay/delay.ts';

export const appendAlertAndRedirect = async (
  message: string,
  type: string,
  url,
) => {
  const alertPlaceholder = document.getElementById(
    'alert-placeholder-container',
  );
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  await delay(1000);
  window.location.href = url;

  alertPlaceholder?.append(wrapper);
};
