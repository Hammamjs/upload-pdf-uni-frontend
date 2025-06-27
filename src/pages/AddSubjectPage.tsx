import { Toaster } from 'react-hot-toast';
import SubjectManagemnet from '../components/SubjectManagement';

const AddSubjectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto">
        <SubjectManagemnet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default AddSubjectPage;
