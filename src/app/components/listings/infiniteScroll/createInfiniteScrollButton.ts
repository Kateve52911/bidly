export function createInfiniteScrollButton() {
  const loadMoreButton: HTMLButtonElement = document.createElement('button');
  loadMoreButton.id = 'load-more-button';
  loadMoreButton.className = 'btn btn-primary';
  loadMoreButton.innerHTML = 'Load more listings ...';

  return loadMoreButton;
}
