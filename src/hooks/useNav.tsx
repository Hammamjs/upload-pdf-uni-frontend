import { useState } from 'react';
import { useStudent } from '../hooks/useStudent';
import { clearFromLocalstorage } from '../lib/LocalStorage';
import { logout } from '../api/StudentApi';
import useNotificationSystem from '../hooks/useNotificationSystem';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useNav = () => {
  const { student } = useStudent();
  const [hideLinks, setHideLinks] = useState(true);

  const { notificationsNumber } = useNotificationSystem();

  const logoutFunc = async () => {
    clearFromLocalstorage('studentInfo');
    try {
      const studentEmail = student!.email;
      await logout(studentEmail);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
    }
  };

  const handleLogout = (pathTo: string) => {
    if (pathTo === '/login') {
      setHideLinks(true);
      logoutFunc();
      clearFromLocalstorage('studentInfo');
      window.location.reload();
    } else setHideLinks(true);
  };
  return {
    hideLinks,
    setHideLinks,
    notificationsNumber,
    handleLogout,
    studentRole: student?.role,
  };
};
