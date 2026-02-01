export function createInfiniteScrollButton() {
  const controlsContainer: HTMLDivElement = document.createElement('div');
  controlsContainer.className = 'd-flex justify-content-center gap-3';
  controlsContainer.id = 'controls-container';

  const loadMoreButton: HTMLButtonElement = document.createElement('button');
  loadMoreButton.id = 'load-more-button';
  loadMoreButton.className = 'btn btn-primary';
  loadMoreButton.innerHTML = 'Load more listings ...';

  controlsContainer.append(loadMoreButton);

  return controlsContainer;
}
