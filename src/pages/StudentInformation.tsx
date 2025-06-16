import { Toaster } from 'react-hot-toast';
import StudentInfo from '../components/StudentInfo';

const StudentInformation = () => {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      <StudentInfo />
      <Toaster position="top-right" />
    </div>
  );
};

export default StudentInformation;
