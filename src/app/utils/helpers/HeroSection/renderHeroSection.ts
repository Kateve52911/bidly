import { isAuthenticated } from '../../auth/auth.ts';

export function renderHeroSection() {
  const heroDiv: HTMLDivElement = document.createElement('div');
  heroDiv.id = 'heroSection';
  heroDiv.className = 'heroSection bg-gradient-primary p-4';

  const heroTitle: HTMLHeadingElement = document.createElement('h1');
  heroTitle.className = 'heroTitle text-white text-center';
  heroTitle.innerHTML = 'Premium Bidding';

  const heroParagraph1: HTMLParagraphElement = document.createElement('p');
  heroParagraph1.className = 'heroParagraph text-white text-center';
  heroParagraph1.innerHTML =
    'Experience luxury auctions with sophisticated tools designed for discerning bidders. Elevate your bidding strategy.';

  const heroParagraph2: HTMLParagraphElement = document.createElement('p');
  heroParagraph2.className = 'heroParagraph text-white text-center';
  heroParagraph2.innerHTML =
    'Premium features that deliver exceptional results for sophisticated bidders';

  heroDiv.appendChild(heroTitle);
  heroDiv.appendChild(heroParagraph1);
  heroDiv.appendChild(heroParagraph2);

  if (!isAuthenticated()) {
    const button: HTMLButtonElement = document.createElement('button');
    button.id = 'heroButton';
    button.type = 'button';
    button.className = 'btn btn-success d-block mx-auto ';
    button.textContent = 'Join Now!';
    button.addEventListener('click', (): void => {
      window.location.href = '/login';
    });
    heroDiv.appendChild(button);
  }

  return heroDiv;
}
