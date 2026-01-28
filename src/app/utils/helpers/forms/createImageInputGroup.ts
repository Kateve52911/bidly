import { createLabel } from './createLabel.ts';
import { createUserInput } from './createInput.ts';

export function createImageInputGroup(index: number): HTMLDivElement {
  const group: HTMLDivElement = document.createElement('div');
  group.className = 'border rounded p-2 mb-2 position-relative';

  const urlContainer: HTMLDivElement = document.createElement('div');
  urlContainer.className = 'mb-2';
  urlContainer.appendChild(
    createLabel(`Image ${index + 2} URL`, `imageUrl-${index}`),
  );
  urlContainer.appendChild(
    createUserInput(
      'Image URL (https://...)',
      'text',
      `imageUrl-${index}`,
      `imageUrl-${index}`,
    ),
  );

  const altContainer: HTMLDivElement = document.createElement('div');
  altContainer.className = 'mb-2';
  altContainer.appendChild(
    createLabel(`Image ${index + 2} Alt`, `imageAlt-${index}`),
  );
  altContainer.appendChild(
    createUserInput(
      'Image Alt text',
      'text',
      `imageAlt-${index}`,
      `imageAlt-${index}`,
    ),
  );

  const removeBtn: HTMLButtonElement = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm btn-outline-danger';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => group.remove());

  group.appendChild(urlContainer);
  group.appendChild(altContainer);
  group.appendChild(removeBtn);

  return group;
}
