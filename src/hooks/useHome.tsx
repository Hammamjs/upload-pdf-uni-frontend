import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AyatWAzkar } from '../data/ayatWAzkar';

const useHome = () => {
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * AyatWAzkar.length);
    const choosen = AyatWAzkar[randomNumber];
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-white p-4 shadow-md round-md border text-right font-arabic`}
        dir="rtl"
      >
        {choosen}
      </div>
    ));
  }, []);
};

export default useHome;
