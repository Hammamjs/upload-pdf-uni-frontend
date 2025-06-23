import Search from './Search';
import StudentRoleCard from './StudentRoleCard';
import StudentSkeleton from '../animation/StudentSkeleton';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import LoadingMaterials from '@/animation/LoadingMaterials';
import SuspenseLoader from '@/animation/SuspenseLoader';

const StudentRoles = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<SuspenseLoader />}>
        <StudentRoleCard />
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
};

export default StudentRoles;
