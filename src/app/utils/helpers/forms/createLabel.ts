export function createLabel(text: string, htmlFor: string): HTMLLabelElement {
  const label: HTMLLabelElement = document.createElement('label');
  label.textContent = text;
  label.htmlFor = htmlFor;
  label.className = 'form-label';
  return label;
}
