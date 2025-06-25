import { useState } from 'react';
import { useStudent } from '../hooks/useStudent';
import { clearFromLocalstorage } from '../lib/LocalStorage';
import { logout } from '../api/AuthApi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { navItems } from '@/data/navLinksArr';
import {
  Home,
  GraduationCap,
  Upload,
  Users,
  FileText,
  UserCog,
  BookOpen,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const useNav = () => {
  const { student } = useStudent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const LogoutSession = async () => {
    clearFromLocalstorage('studentInfo');
    try {
      if (!student?.email) return;
      await logout(student?.email);
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err.response?.data?.message);
    }
  };

  // Filter links based on user role
  const allowedLinks = navItems.filter((link) =>
    link.role.includes(student?.role || '')
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseAndLogout = (routeName: string) => {
    if (routeName.startsWith('Logout')) {
      // should navigate to login page
      LogoutSession();
      window.location.reload();
    }
    setIsMenuOpen(false);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const iconMap = {
    Home,
    GraduationCap,
    Upload,
    Users,
    FileText,
    UserCog,
    BookOpen,
    Plus,
    Settings,
    LogOut,
  };

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return {
    IconComponent,
    allowedLinks,
    toggleMenu,
    handleNotificationClick,
    studentRole: student?.role,
    handleCloseAndLogout,
    isMenuOpen,
  };
};
