export function createBidButton(text: string): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.innerHTML = text;
  button.className = 'btn btn-success';
  return button;
}
