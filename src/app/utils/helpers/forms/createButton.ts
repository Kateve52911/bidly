export function createSubmitButton(text: string): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'submit';
  button.innerHTML = text;
  button.className = 'btn btn-primary';
  return button;
}
