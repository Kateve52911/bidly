import * as bootstrap from 'bootstrap';

export async function renderConfirmActionModal(
  message: string,
  title: string,
  confirmLabel: string,
): Promise<void> {
  const outerDiv: HTMLDivElement = document.createElement('div');
  outerDiv.className = 'modal fade';
  outerDiv.tabIndex = 1;

  const dialogDiv: HTMLDivElement = document.createElement('div');
  dialogDiv.className = 'modal-dialog';

  const contentDiv: HTMLDivElement = document.createElement('div');
  contentDiv.className = 'modal-content';

  const headerDiv: HTMLDivElement = document.createElement('div');
  headerDiv.className = 'modal-header fs-5';

  const header: HTMLHeadingElement = document.createElement('h3');
  header.className = 'modal-title';
  header.textContent = title;
  headerDiv.appendChild(header);

  const closeButton: HTMLButtonElement = document.createElement('button');
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');
  headerDiv.appendChild(closeButton);

  const bodyDiv: HTMLDivElement = document.createElement('div');
  bodyDiv.className = 'modal-body';

  const messageDiv: HTMLDivElement = document.createElement('div');
  messageDiv.className = 'modal-message';
  messageDiv.innerHTML = message;
  bodyDiv.appendChild(messageDiv);

  const footerDiv: HTMLDivElement = document.createElement('div');
  footerDiv.className = 'modal-footer';

  const cancelButton: HTMLButtonElement = document.createElement('button');
  cancelButton.className = 'btn btn-secondary';
  cancelButton.textContent = 'Cancel';
  footerDiv.appendChild(cancelButton);

  const confirmButton: HTMLButtonElement = document.createElement('button');
  confirmButton.className = 'btn btn-warning';
  confirmButton.textContent = confirmLabel;
  footerDiv.appendChild(confirmButton);

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(bodyDiv);
  contentDiv.appendChild(footerDiv);
  dialogDiv.appendChild(contentDiv);
  outerDiv.appendChild(dialogDiv);

  return new Promise<void>((resolve, reject): void => {
    document.body.appendChild(outerDiv);

    const modal = new bootstrap.Modal(outerDiv);
    modal.show();

    confirmButton.addEventListener('click', (): void => {
      modal.hide();
      outerDiv.addEventListener('hidden.bs.modal', (): void => {
        outerDiv.remove();
      });
      resolve();
    });

    cancelButton.addEventListener('click', (): void => {
      modal.hide();
      outerDiv.remove();
      reject();
    });

    closeButton.addEventListener('click', (): void => {
      modal.hide();
      outerDiv.remove();
      reject();
    });
  });
}
