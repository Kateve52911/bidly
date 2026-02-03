import { UpdatedProfile } from '../../../api/user/types/updatedProfileTypes.ts';

export function fetchEditProfileFormData(formData: FormData): UpdatedProfile {
  const bio = formData.get('bio') as string;
  const url = formData.get('avatarUrl') as string;
  const alt = formData.get('avatarAlt') as string;

  const updatedProfileData: UpdatedProfile = {};

  if (bio) {
    updatedProfileData.bio = bio;
  }

  if (url && alt) {
    updatedProfileData.avatar = [{ url, alt }];
  }

  return updatedProfileData;
}
