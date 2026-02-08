import { UpdatedListingData } from '../../../api/listings/put/types/updatedListingData.ts';

export function getEditFormData(formData: FormData): UpdatedListingData {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const url = formData.get('imageUrl') as string;
  const alt = formData.get('imageAlt') as string;

  const updatedData: UpdatedListingData = {};

  if (title) {
    updatedData.title = title;
  }

  if (description) {
    updatedData.description = description;
  }

  if (url && alt) {
    updatedData.media = [{ url, alt }];
  }

  return updatedData;
}
