import LoadingMaterials from '@/animation/LoadingMaterials';
import PDFManagement from '@/components/PDFManagement';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const PDFManagementPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingMaterials />}>
        <PDFManagement />
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
};

export default PDFManagementPage;
