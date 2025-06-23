import { formatDistanceToNow } from 'date-fns';

export const formatDateFns = (date: Date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
