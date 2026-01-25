export function createPaginationControls() {
  const controlsContainer: HTMLDivElement = document.createElement('div');
  controlsContainer.className = 'd-flex justify-content-center gap-3';
  controlsContainer.id = 'controls-container';

  const prevButton: HTMLButtonElement = document.createElement('button');
  prevButton.id = 'prev-button';
  prevButton.className = 'prev-button btn btn-primary';
  prevButton.innerHTML = `<i class="bi bi-arrow-left-square"></i>`;

  const nextButton = document.createElement('button');
  nextButton.id = 'next-button';
  nextButton.className = 'next-button btn btn-primary';
  nextButton.innerHTML = `<i class="bi bi-arrow-right-square"></i>`;

  controlsContainer.append(prevButton, nextButton);

  return controlsContainer;
}
