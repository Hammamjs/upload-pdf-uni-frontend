import { Link } from 'react-router-dom';

const CustomLink = ({
  path,
  to,
  className,
  hideNav,
}: {
  path: string;
  to: string;
  className: string;
  hideNav?: () => void;
}) => {
  return (
    <Link to={path} className={className} onClick={hideNav}>
      {to}
    </Link>
  );
};

export default CustomLink;
