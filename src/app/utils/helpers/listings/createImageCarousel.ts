import { Listing } from '../card/type/listing.ts';

export function createImageCarousel(listingData: Listing): HTMLDivElement {
  const carousel: HTMLDivElement = document.createElement('div');
  carousel.className = 'carousel slide';
  carousel.style.position = 'relative';
  carousel.style.width = '100%';
  carousel.id = 'listing-carousel';

  const innerCarousel: HTMLDivElement = document.createElement('div');
  innerCarousel.className = 'carousel-inner';
  if (listingData.media.length > 0) {
    listingData.media.forEach(
      (media: { url: string; alt: string }, index: number) => {
        const carouselItem: HTMLDivElement = document.createElement('div');
        carouselItem.className =
          index === 0 ? 'carousel-item active' : 'carousel-item';

        const img: HTMLImageElement = document.createElement('img');
        img.className = 'd-block w-100';
        img.src = media.url;

        carouselItem.appendChild(img);
        innerCarousel.appendChild(carouselItem);
      },
    );
  }

  const prevBtn: HTMLButtonElement = document.createElement('button');
  prevBtn.className = 'carousel-control-prev';
  prevBtn.type = 'button';
  prevBtn.dataset.bsTarget = '#listing-carousel';
  prevBtn.dataset.bsSlide = 'prev';

  const prevBtnIcon: HTMLSpanElement = document.createElement('span');
  prevBtnIcon.className = 'carousel-control-prev-icon text-grey';
  prevBtnIcon.ariaHidden = 'true';

  const visuallyHiddenPrev: HTMLSpanElement = document.createElement('span');
  visuallyHiddenPrev.className = 'visually-hidden';
  visuallyHiddenPrev.innerHTML = 'Previous';

  prevBtn.appendChild(prevBtnIcon);
  prevBtn.appendChild(visuallyHiddenPrev);

  const nextBtn: HTMLButtonElement = document.createElement('button');
  nextBtn.className = 'carousel-control-next';
  nextBtn.dataset.bsTarget = '#listing-carousel';
  nextBtn.dataset.bsSlide = 'next';

  const nextBtnIcon: HTMLSpanElement = document.createElement('span');
  nextBtnIcon.className = 'carousel-control-next-icon text-grey';
  nextBtnIcon.ariaHidden = 'true';

  const visuallyHiddenNext: HTMLSpanElement = document.createElement('span');
  visuallyHiddenNext.className = 'visually-hidden ';
  visuallyHiddenNext.innerHTML = 'Next';

  nextBtn.appendChild(nextBtnIcon);
  nextBtn.appendChild(visuallyHiddenNext);

  carousel.appendChild(innerCarousel);
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  return carousel;
}
