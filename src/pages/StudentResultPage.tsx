import { Toaster } from 'react-hot-toast';
import StudentResult from '../components/StudentResult';
import { Suspense } from 'react';
import SuspenseLoader from '@/animation/SuspenseLoader';

const StudentResultPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<SuspenseLoader />}>
        <StudentResult />
      </Suspense>
      <Toaster reverseOrder={false} position="top-right" />
    </div>
  );
};

export default StudentResultPage;
