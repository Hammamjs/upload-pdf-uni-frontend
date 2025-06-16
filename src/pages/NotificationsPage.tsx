import { Toaster } from 'react-hot-toast';
import Notification from '../components/Notification';
import useNotificationSystem from '../hooks/useNotificationSystem';

const NotificationsPage = () => {
  const { notifications } = useNotificationSystem();

  return (
    <div className="min-h-[calc(100vh-80px)] container mx-auto mt-5 w-full md:px-0 px-2">
      {!notifications.length ? (
        <p className="text-gray-300 text-center mt-auto">
          No Notifications yet ... 😔
        </p>
      ) : (
        notifications.map((notification) => (
          <Notification
            subject={notification.subject}
            message={notification.message}
            createdAt={notification.createdAt}
            key={notification._id}
            read={false}
          />
        ))
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default NotificationsPage;
