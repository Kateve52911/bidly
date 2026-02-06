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
