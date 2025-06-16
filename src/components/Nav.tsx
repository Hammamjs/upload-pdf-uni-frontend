import { FaBell, FaXmark } from 'react-icons/fa6';
import CustomLink from './shared/CustomLink';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LINKS } from '../data/navLinksArr';
import { useNav } from '../hooks/useNav';

const Nav = () => {
  const {
    handleLogout,
    hideLinks,
    notificationsNumber,
    setHideLinks,
    studentRole,
  } = useNav();

  return (
    <div className="w-full bg-gray-400 p-3 relative">
      <div className="container mx-auto flex justify-between text-gray-500 md:flex-row flex-col items-center">
        <CustomLink
          to="University of Bahri"
          path="/"
          className=" hover:text-white transition"
        />
        <div className="flex justify-between items-center">
          <Link to="/notifications">
            <div className="notify relative">
              <FaBell className="mr-2 cursor-pointer" />
              {notificationsNumber > 0 ? (
                <p className="`content-[''] absolute -top-1 right-2.5 text-white text-[8px] w-2.5 h-2.5 rounded-full bg-red-400 flex justify-center items-center">
                  {notificationsNumber}
                </p>
              ) : (
                ''
              )}
            </div>
          </Link>
          <FaBars
            className="hover:text-white cursor-pointer transition"
            onClick={() => setHideLinks((prev) => !prev)}
          />
        </div>
        <div
          className={`absolute top-0 bg-white shadow-lg h-screen w-50 px-3 py-10 z-40 transition-all duration-150 ${
            hideLinks ? '-left-full' : 'left-0'
          }`}
        >
          <FaXmark
            className="absolute right-5 top-5 cursor-pointer hover:text-red-300 p-1 text-xl transition"
            onClick={() => setHideLinks(true)}
          />
          <ul className="list-none flex flex-col items-start gap-3 md:text-sm text-xs">
            {LINKS.map(
              ({ path, to, role }) =>
                role.includes(studentRole) && (
                  <CustomLink
                    key={path}
                    path={to}
                    to={path}
                    hideNav={() => handleLogout(to)}
                    className="hover:text-gray-400 transition-all select-none w-full p-1 hover:px-3"
                  />
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
