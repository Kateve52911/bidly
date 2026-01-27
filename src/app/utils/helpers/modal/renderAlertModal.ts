import * as bootstrap from 'bootstrap';

export async function renderConfirmActionModal(
  message: string,
  title: string,
  confirmLabel: string,
): Promise<void> {
  const outerDiv = document.createElement('div');
  outerDiv.className = 'modal fade';
  outerDiv.tabIndex = 1;

  const dialogDiv = document.createElement('div');
  dialogDiv.className = 'modal-dialog';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'modal-content';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'modal-header fs-5';

  const header = document.createElement('h3');
  header.className = 'modal-title';
  header.textContent = title;
  headerDiv.appendChild(header);

  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');
  headerDiv.appendChild(closeButton);

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'modal-body';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'modal-message';
  messageDiv.innerHTML = message;
  bodyDiv.appendChild(messageDiv);

  const footerDiv = document.createElement('div');
  footerDiv.className = 'modal-footer';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'btn btn-secondary';
  cancelButton.textContent = 'Cancel';
  footerDiv.appendChild(cancelButton);

  const confirmButton = document.createElement('button');
  confirmButton.className = 'btn btn-warning';
  confirmButton.textContent = confirmLabel;
  footerDiv.appendChild(confirmButton);

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(bodyDiv);
  contentDiv.appendChild(footerDiv);
  dialogDiv.appendChild(contentDiv);
  outerDiv.appendChild(dialogDiv);

  return new Promise<void>((resolve, reject) => {
    document.body.appendChild(outerDiv);

    const modal = new bootstrap.Modal(outerDiv);
    modal.show();

    confirmButton.addEventListener('click', () => {
      modal.hide();
      outerDiv.addEventListener('hidden.bs.modal', () => {
        outerDiv.remove();
      });
      resolve();
    });

    cancelButton.addEventListener('click', () => {
      modal.hide();
      outerDiv.remove();
      reject();
    });

    closeButton.addEventListener('click', () => {
      modal.hide();
      outerDiv.remove();
      reject();
    });
  });
}
