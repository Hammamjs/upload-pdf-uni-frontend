import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import useNotificationSystem from '@/hooks/useNotificationSystem';
import { useNav } from '@/hooks/useNav';
import { Bell, GraduationCap, Menu, X } from 'lucide-react';

const Navigation = () => {
  const {
    IconComponent,
    allowedLinks,
    handleCloseAndLogout,
    handleNotificationClick,
    studentRole,
    toggleMenu,
    isMenuOpen,
  } = useNav();

  const { unreadCount } = useNotificationSystem();
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Digital library
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {allowedLinks.slice(0, 4).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <IconComponent iconName={link.icon} />
                {link.path}
              </Link>
            ))}
          </div>

          {/* Right Side - Notifications and Menu */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            {studentRole && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNotificationClick}
                className="relative p-2"
              >
                <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            )}

            {/* Mobile Menu Button */}
            {studentRole !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="md:hidden p-2 "
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Desktop Menu Button */}
            {studentRole !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="hidden md:flex p-2"
              >
                <Menu className="h-5 w-5 cursor-pointer" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile/Toggle Menu */}
        {isMenuOpen && (
          <div className="md:absolute md:right-4 md:top-16 md:w-80 pb-4 md:pb-0">
            <Card className="md:shadow-lg md:border">
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Navigation Menu
                </h3>
                {allowedLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => handleCloseAndLogout(link.path)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors w-full"
                  >
                    <IconComponent iconName={link.icon} />
                    {link.path}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
