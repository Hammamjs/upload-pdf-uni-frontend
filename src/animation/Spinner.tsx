import { ReactElement } from 'react';

const Spinner = ({ children }: { children?: ReactElement }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <p className="animate-spin mb-5 mx-auto w-5 h-5 border rounded-full border-t-transparent"></p>
        {children}
      </div>
    </div>
  );
};

export default Spinner;
