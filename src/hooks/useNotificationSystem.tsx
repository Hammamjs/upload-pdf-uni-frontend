import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  markNotificationAsRead,
  studentNotifications,
} from '../api/StudentApi';
import { useStudent } from './useStudent';
import toast from 'react-hot-toast';
import axios from 'axios';
import useSWR from 'swr';
import { NotificationsType } from '../types';
import { useLocation } from 'react-router-dom';

const useNotificationSystem = () => {
  const { student } = useStudent();
  const [notificationsNumber, setNotificationNumber] = useState(0);
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);

  // get current location
  const { pathname } = useLocation();

  const {
    isLoading,
    data: notificationsData,
    mutate,
  } = useSWR('notification', studentNotifications);

  // assign data to notifications
  useEffect(() => {
    setNotifications(notificationsData);
  }, [isLoading]);

  useEffect(() => {
    const unreadMessages = notifications?.filter(
      (notify: { read: boolean }) => !notify.read
    ).length;
    setNotificationNumber(unreadMessages || 0);
  }, [notifications]);

  useEffect(() => {
    if (!student?.id) return;

    const socket = io('http://localhost:3500');

    // socketRef.current = socket;

    if (student && student.id) socket.emit('joinRoom', student.id);

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setNotificationNumber((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [student?.id]);

  useEffect(() => {
    const AllMessagesRead = async () => {
      try {
        const response = await markNotificationAsRead();
        mutate();
        toast.success(response.message);
      } catch (err) {
        if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
      }
    };

    if (pathname === '/notifications') AllMessagesRead();
  }, []);

  return {
    notifications,
    notificationsNumber,
  };
};

export default useNotificationSystem;
