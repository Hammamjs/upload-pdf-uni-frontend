import { ReactElement } from 'react';
import cn from '../../utils/cn';

const CustomButton = ({
  children,
  className,
  isSubmitting,
  onClick,
}: {
  children: ReactElement;
  isSubmitting?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-sm p-2 px-4 outline-none border-none cursor-pointer disabled:bg-gray-400 disabled:text-white',
        className
      )}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="w-5 h-5 rounded-full border border-t-transparent animate-spin transition duration-200 block mx-auto"></span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default CustomButton;
