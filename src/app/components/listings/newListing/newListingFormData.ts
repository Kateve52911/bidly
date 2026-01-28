export function fetchFormDataFromNewListingForm(formData: FormData) {
  const title: FormDataEntryValue | null = formData.get('title');
  const description: FormDataEntryValue | null = formData.get('description');
  const url: FormDataEntryValue | null = formData.get('imageUrl');
  const alt: FormDataEntryValue | null = formData.get('imageAlt');
  const endingDate: FormDataEntryValue | null = formData.get(
    'endingDate',
  ) as string;
  const endsAt: string = new Date(endingDate).toISOString();

  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new Error('Title is required');
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    throw new Error('Description is required');
  }

  if (!url || typeof url !== 'string' || !url.trim()) {
    throw new Error('URL is required');
  }

  if (!alt || typeof alt !== 'string' || !alt.trim()) {
    throw new Error('Alt is required');
  }

  if (
    !endingDate ||
    typeof endingDate !== 'string' ||
    !endingDate.trim() ||
    isNaN(new Date(endingDate).getTime())
  ) {
    throw new Error('End date is required');
  }

  const media: Array<{ url: string; alt: string }> = [
    {
      url: url,
      alt: alt,
    },
  ];

  const additionalImages: Map<number, { url?: string; alt?: string }> =
    new Map();

  for (const [key, value] of formData.entries()) {
    const urlMatch = key.match(/^imageUrl-(\d+)$/);
    if (urlMatch && typeof value === 'string' && value.trim()) {
      const index = parseInt(urlMatch[1]);
      if (!additionalImages.has(index)) {
        additionalImages.set(index, {});
      }
      additionalImages.get(index)!.url = value.trim();
    }

    const altMatch = key.match(/^imageAlt-(\d+)$/);
    if (altMatch && typeof value === 'string' && value.trim()) {
      const index = parseInt(altMatch[1]);
      if (!additionalImages.has(index)) {
        additionalImages.set(index, {});
      }
      additionalImages.get(index)!.alt = value.trim();
    }
  }

  additionalImages.forEach((image) => {
    if (image.url) {
      media.push({
        url: image.url,
        alt: image.alt || '',
      });
    }
  });

  const listingData = {
    title: title,
    description: description,
    media: media,
    endsAt: endsAt,
  };

  return listingData;
}

const form: HTMLElement | null = document.getElementById('new-listing-form');

form?.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  console.log(typeof form);

  if (form) {
    const formData = new FormData(form as HTMLFormElement);
    console.log(fetchFormDataFromNewListingForm(formData));
  }
});
