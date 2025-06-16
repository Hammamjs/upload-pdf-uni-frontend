import cn from '../utils/cn';

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('w-full h-14 mb-3 animate-pulse bg-gray-300', className)}
    ></div>
  );
};

export default Skeleton;
