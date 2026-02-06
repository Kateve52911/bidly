export function displayListingStatus(endDate: string): {
  status: string;
  className: string;
} {
  const currentDate = new Date();
  const endsAtDate = new Date(endDate);

  if (endsAtDate > currentDate) {
    return { status: 'active', className: 'bg-success-subtle' };
  } else {
    return { status: 'ended', className: 'bg-danger-subtle' };
  }
}
