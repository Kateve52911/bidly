export function createInfiniteScrollButton(): HTMLButtonElement {
  const loadMoreButton: HTMLButtonElement = document.createElement('button');
  loadMoreButton.id = 'load-more-button';
  loadMoreButton.className = 'btn btn-outline-primary d-block mx-auto my-2';
  loadMoreButton.innerHTML = 'Load more listings ...';

  return loadMoreButton;
}
