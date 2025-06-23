import { Toaster } from 'react-hot-toast';
import HomeUi from '../components/HomeUi';
import Features from '../components/Features';
import DownloadSection from '../components/DownloadSection';
import { Suspense } from 'react';
import DownloadCardSkeleton from '@/animation/DownloadSectionSkeleton';

const Home = () => {
  return (
    <div className="p-2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HomeUi />
      <Features />
      <Suspense fallback={<DownloadCardSkeleton />}>
        <DownloadSection />
      </Suspense>
      <Toaster position="top-left" />
    </div>
  );
};

export default Home;
