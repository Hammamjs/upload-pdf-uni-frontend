import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
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

  const socketRef = useRef<Socket | null>(null);

  const { data: notificationsData, mutate } = useSWR<NotificationsType[]>(
    'notification',
    studentNotifications
  );

  // assign data to notifications
  useEffect(() => {
    setNotifications(notificationsData || []);
  }, [notificationsData]);

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

    if (!socketRef.current) {
      socketRef.current = io(envDev);
    }

    // socketRef.current = socket;

    socketRef.current.emit('joinRoom', student._id);

    socketRef.current.on('notification', (data) => {
      mutate(
        (currentNotifications = []) => [data, ...currentNotifications],
        false
      );
      setNotifications((prev) => [data, ...prev]);
      setNotificationNumber((prev) => prev + 1);
    });

    return () => {
      socketRef.current?.off('notification');
      socketRef.current?.disconnect();
      socketRef.current = null;
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
