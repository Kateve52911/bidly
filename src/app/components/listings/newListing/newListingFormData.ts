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

  const listingData = {
    title: title,
    description: description,
    media: [
      {
        url: url,
        alt: alt,
      },
    ],
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
