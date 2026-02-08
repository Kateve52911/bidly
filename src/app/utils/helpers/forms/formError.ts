import { isURLValid } from '../../validation/urlValidation.ts';

export function showURLError(inputId: string, containerId: string): void {
  const urlDiv: HTMLElement | null = document.getElementById(containerId);
  const urlInput = document.getElementById(inputId) as HTMLInputElement;
  const messageDiv: HTMLDivElement = document.createElement('div');

  if (!urlInput) {
    return;
  }
  const existingFeedback: Element | null | undefined = urlDiv?.querySelector(
    '.valid-feedback, .invalid-feedback',
  );
  existingFeedback?.remove();

  if (isURLValid(urlInput.value)) {
    urlInput.classList.add('is-valid');
    urlInput.classList.remove('is-invalid');
    messageDiv.classList.add('valid-feedback', 'd-block');
    messageDiv.innerText = 'URL looks good! ✓';
  } else {
    urlInput.classList.add('is-invalid');
    urlInput.classList.remove('is-valid');
    messageDiv.classList.add('invalid-feedback', 'd-block');
    messageDiv.innerText =
      'Please enter a valid URL (e.g., https://example.com/image.jpg)';
  }
  urlDiv?.appendChild(messageDiv);
}

export function clearURLError(inputId: string, containerId: string) {
  const urlDiv: HTMLElement | null = document.getElementById(containerId);
  const urlInput = document.getElementById(inputId) as HTMLInputElement;

  urlInput.classList.remove('is-invalid', 'is-valid');

  const existingFeedback = urlDiv?.querySelector(
    '.valid-feedback, .invalid-feedback',
  );
  existingFeedback?.remove();
}
