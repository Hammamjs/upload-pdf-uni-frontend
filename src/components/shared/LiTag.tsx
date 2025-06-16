import cn from '../../utils/cn';

const LiTag = ({
  value,
  className,
  onClick,
}: {
  value: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <li
      className={cn('cursor-pointer hover:bg-white transition', className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {value}
    </li>
  );
};

export default LiTag;
