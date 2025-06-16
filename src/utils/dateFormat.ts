import { formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });
