import { Toaster } from 'react-hot-toast';
import StudentResult from '../components/StudentResult';

const StudentResultPage = () => {
  return (
    <div className="container relative p-2 mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1">
      <StudentResult />
      <Toaster reverseOrder={false} position="top-right" />
    </div>
  );
};

export default StudentResultPage;
