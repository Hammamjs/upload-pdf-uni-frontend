import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  FileText,
  Calendar,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import useNotificationSystem from '@/hooks/useNotificationSystem';
import { formatDate, formatDateFns } from '@/utils/dateFormat';

const Notifications = () => {
  const navigate = useNavigate();

  const { notifications, unreadCount, markAllAsRead, handleViewFile } =
    useNotificationSystem();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Notifications
                  </h1>
                  <p className="text-gray-600">
                    {unreadCount > 0
                      ? `${unreadCount} new notifications`
                      : 'All caught up!'}
                  </p>
                </div>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {notifications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600">
                  You're all caught up! Check back later for updates.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.isRead ? 'border-blue-200 bg-blue-50/50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FileText className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-green-700">
                          New Subject Material
                        </span>
                        {!notification.isRead && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {notification.message}
                      </h3>

                      <p className="text-gray-600 mb-3">
                        New study material has been added for{' '}
                        <strong>{notification.subject}</strong>
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="h-4 w-4" />
                        Published on {formatDate(notification.createdAt)}
                        <p className="text-gray-300 text-xs">
                          {formatDateFns(notification.createdAt)}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleViewFile(notification)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Material
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
