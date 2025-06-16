import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputValues: ClassValue[]) => {
  return twMerge(clsx(inputValues));
};

export default cn;
