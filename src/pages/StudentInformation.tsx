import { Toaster } from 'react-hot-toast';
import ProfilePage from '../components/StudentInfo';

const StudentInformation = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ProfilePage />
      <Toaster position="top-right" />
    </div>
  );
};

export default StudentInformation;
