export function fetchFormDataFromNewListingForm(formData: FormData) {
  const title: FormDataEntryValue | null = formData.get('title');

  const description: FormDataEntryValue | null = formData.get('description');

  const url: FormDataEntryValue | null = formData.get('imageUrl');

  const alt: FormDataEntryValue | null = formData.get('imageAlt');

  const endingDate: FormDataEntryValue | null = formData.get(
    'endingDate',
  ) as string;
  const endsAt: string = new Date(endingDate).toISOString();

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

  //console.log(listingData);

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
