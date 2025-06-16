import { Toaster } from 'react-hot-toast';
import AddSubject from '../components/AddSubject';

const AddSubjectPage = () => {
  return (
    <div className="h-full min-h-[calc(100vh-80px)]">
      <div className="container mx-auto">
        <AddSubject />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default AddSubjectPage;
