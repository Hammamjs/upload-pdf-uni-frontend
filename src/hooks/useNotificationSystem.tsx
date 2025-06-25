import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  markNotificationAsRead,
  markNotificationsAsRead,
  studentNotifications,
} from '../api/StudentApi';
import { useStudent } from './useStudent';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { NotificationsType } from '../types';
import axios from 'axios';

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
      ? 'http://localhost:3500'
      : 'https://upload-pdf-uni-backend.onrender.com';

    const socket = io(envDev, {
      transports: ['websocket'],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

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
    const response = await markNotificationsAsRead();
    mutate();
    toast.success(response.message);
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    setNotificationNumber((prev) => prev - 1);
  };

  const markAsRead = async (id: string) => {
    try {
      const isRequestNeeded = notifications.find((n) => n._id === id)?.isRead;
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
      if (!isRequestNeeded) {
        await markNotificationAsRead(id);
        toast.success('Message Read');
        setNotificationNumber((prev) => prev - 1);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  const handleViewFile = async (notification: NotificationsType) => {
    markAsRead(notification._id);
    await markAsRead(notification._id);
  };

  return {
    notifications,
    unreadCount: notificationsNumber,
    markAllAsRead,
    handleViewFile,
  };
};

export default useNotificationSystem;
