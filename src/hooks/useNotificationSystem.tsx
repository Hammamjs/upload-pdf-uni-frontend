import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  markNotificationAsRead,
  studentNotifications,
} from '../api/StudentApi';
import { useStudent } from './useStudent';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { NotificationsType } from '../types';

const useNotificationSystem = () => {
  const { student } = useStudent();
  const [notificationsNumber, setNotificationNumber] = useState(0);
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);

  const {
    isLoading,
    data: notificationsData,
    mutate,
  } = useSWR<NotificationsType[]>('notification', studentNotifications);

  // assign data to notifications
  useEffect(() => {
    setNotifications(notificationsData || []);
    console.log(notificationsData);
  }, [isLoading]);

  useEffect(() => {
    const unreadMessages = notifications?.filter(
      (notify) => !notify.isRead
    ).length;
    setNotificationNumber(unreadMessages || 0);
  }, [notifications]);

  useEffect(() => {
    if (!student?._id) return;

    const envDev = import.meta.env.DEV
      ? import.meta.env.VITE_DEV_URL
      : import.meta.env.VITE_PROD_URL;

    // console.log(envDev);
    const socket = io(envDev);

    // socketRef.current = socket;

    if (student && student._id) socket.emit('joinRoom', student._id);

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setNotificationNumber((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [student?._id]);

  const markAllAsRead = async () => {
    const response = await markNotificationAsRead();
    mutate();
    toast.success(response.message);
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleViewFile = (notification: NotificationsType) => {
    markAsRead(notification._id);
    // navigate(notification.fileUrl);
  };

  return {
    notifications,
    unreadCount: notificationsNumber,
    markAllAsRead,
    handleViewFile,
  };
};

export default useNotificationSystem;
