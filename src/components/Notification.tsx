import { Link } from 'react-router-dom';
import CustomButton from './shared/CustomButton';
import type { NotificationsType } from '../types';
import { formatDate } from '../utils/dateFormat';

const Notification = ({ message, subject, createdAt }: NotificationsType) => {
  return (
    <div className="my-1 bg-gray-300 min-h-20 max-h-20 h-full text-end shadow-lg p-3 rounded-sm w-full ">
      <div className="flex justify-between items-center">
        <p>{subject}</p>
        <CustomButton className="m-0 bg-gray-200 p-1 px-3 rounded-md">
          <Link
            to={`/subjects/${subject}`}
            className="hover:text-gray-100 transition"
          >
            Go to file
          </Link>
        </CustomButton>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm"> {message}</p>
        <p>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default Notification;
