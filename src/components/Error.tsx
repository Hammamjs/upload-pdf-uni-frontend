import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  }, []);

  return (
    <div className=" font-bold text-white before:mix-blend-difference relative before:w-full before:h-full before:absolute before:content-[''] before:bg-gray-600 before:top-0 before:left-0 before:animate-[ping_5s_ease-in-out_infinite]">
      <h1 className="md:text-6xl">Error Page not found</h1>
      <p className="text-center my-2">You will redirect to home page</p>
    </div>
  );
};

export default Error;
