import { Toaster } from 'react-hot-toast';
import AddSubject from '../components/AddSubject';
import { Suspense } from 'react';
import SuspenseLoader from '@/animation/SuspenseLoader';

const AddSubjectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto">
        <Suspense fallback={<SuspenseLoader />}>
          <AddSubject />
        </Suspense>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default AddSubjectPage;
