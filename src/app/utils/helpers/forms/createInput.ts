export function createUserInput(
  placeholder: string,
  type: 'text' | 'email' | 'password',
  name: string,
): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  input.className = 'form-control p-6';
  return input;
}
