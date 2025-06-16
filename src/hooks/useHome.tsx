import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AyatWAzkar } from '../data/ayatWAzkar';

const useHome = () => {
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * AyatWAzkar.length);
    const choosen = AyatWAzkar[randomNumber];
    toast(choosen, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        direction: 'rtl',
      },
      duration: 8000,
    });
  }, []);
};

export default useHome;
