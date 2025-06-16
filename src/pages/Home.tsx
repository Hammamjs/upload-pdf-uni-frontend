import { Toaster } from 'react-hot-toast';
import HomeUi from '../components/HomeUi';

const Home = () => {
  return (
    <div className="container mx-auto min-h-[calc(100vh-80px)] p-2">
      <HomeUi />
      <Toaster position="top-center" />
    </div>
  );
};

export default Home;
