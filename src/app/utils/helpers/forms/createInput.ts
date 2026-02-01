export function createUserInput(
  placeholder: string,
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'date'
    | 'datetime-local'
    | 'number'
    | 'search',
  name: string,
  id: string,
  required?: boolean,
  min?: string,
  value?: string,
): HTMLInputElement {
  const input: HTMLInputElement = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = required ?? true;
  input.className = 'form-control p-6';
  input.id = id;
  if (min) {
    input.min = min;
  }
  if (value) {
    input.value = value;
  }
  return input;
}
