import { Toaster } from 'react-hot-toast';
import Notification from '../components/Notification';
import { Suspense } from 'react';
import LoadingMaterials from '@/animation/LoadingMaterials';

const NotificationsPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] md:px-0 px-2 ">
      <div className="container mx-auto w-full p-2">
        <Suspense fallback={<LoadingMaterials />}>
          <Notification />
        </Suspense>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default NotificationsPage;
